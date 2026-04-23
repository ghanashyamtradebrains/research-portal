import { useState, useEffect } from "react";
import {
  Modal,
  Spin,
  Input,
  Button,
  Typography,
  Space,
  Checkbox,
  message,
} from "antd";
import styles from "./survey.module.css";
import {
  getSurveyStatus,
  submitOptionalSurveyQn,
  submitSurvey,
} from "../../pages/api/fetchClient";
import { useDispatch, useSelector } from "react-redux";
import { toggleStore } from "../../redux/reducers/AuthToggleSlice";

const { Text } = Typography;
const { TextArea } = Input;

const SurveyModal = ({ lightMode, isModalOpen }) => {
  const dispatch = useDispatch();
  const { toggleForm } = useSelector(toggleStore);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [customAnswer, setCustomAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [isOpen, setIsOpen] = useState(true);

  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        // In a real app, replace with your actual API endpoint
        // For now, we'll simulate an API call with a timeout

        const res = await getSurveyStatus();

        setTimeout(() => {
          // Mock data based on the image
          setQuestions([
            ...(Array.isArray(res?.data) ? res.data.slice(0, 5) : []),
            {
              id: 6,
              text: "If you would like to see anything else, please specify (Optional)",
              answers: [],
              allowCustomInput: true,
            },
          ]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching survey questions:", error);
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchQuestions();
    }
  }, [isOpen]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => {
      const index = prev.findIndex((item) => item.question === questionId);

      if (index !== -1) {
        // Update existing answer
        const updated = [...prev];
        updated[index] = { question: questionId, answer: value };
        return updated;
      } else {
        // Add new answer
        return [...prev, { question: questionId, answer: value }];
      }
    });
  };

  const handleCustomInputChange = (questionId, value) => {
    setCustomAnswer(value);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      // In a real app, send the answers to your API

      const payload = {
        question: 6,
        response: customAnswer,
      };

      const res1 = await submitSurvey(answers);

      const res2 = await submitOptionalSurveyQn(payload);

      const isSuccessStatus = (status) => [200, 201].includes(status);

      if (isSuccessStatus(res1?.status) && isSuccessStatus(res2?.status)) {
        message.success("🎉 Survey submitted successfully!");
        setIsOpen(false);
      }

      setAnswers([]);
      setCustomAnswer("");
    } catch (error) {
      console.error("Error submitting survey:", error);
      alert("Failed to submit survey. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const renderQuestion = (question) => {
    // const showCustomInput =
    //   question.allowCustomInput && answers[question.id] == "trending";

    return (
      <div key={question.id} className={styles.questionContainer}>
        <div className={styles.questionHeader}>
          <span strong className={styles.questionNumber}>
            {question.id}.
          </span>
          <Text className={styles.questionText}>{question.text}</Text>
        </div>

        {question.answers.length > 0 ? (
          <Checkbox.Group
            className={styles.checkboxGroup}
            value={
              answers?.find((item) => item.question === question.id)?.answer ||
              []
            }
            onChange={(checkedValues) => {
              const specialOptions = [
                "No specific preference",
                "No preference",
                "Not sure",
              ];

              const selectedOptionTexts = question.answers
                .filter((opt) => checkedValues.includes(opt.id))
                .map((opt) => opt.text);

              const hasSpecial = selectedOptionTexts.some((text) =>
                specialOptions.includes(text)
              );

              // If special option is selected, override and allow only it
              if (hasSpecial) {
                const specialOption = question.answers.find((opt) =>
                  specialOptions.includes(opt.text)
                );
                handleAnswerChange(question.id, [specialOption.id]);
              } else {
                // Normal selection logic (up to 2)
                handleAnswerChange(question.id, checkedValues.slice(0, 2));
              }
            }}
          >
            <div className="flex flex-col">
              <Space direction="vertical" className={styles.optionsContainer}>
                {question.answers.map((option) => {
                  const currentAnswers =
                    answers.find((item) => item.question === question.id)
                      ?.answer || [];

                  const isSpecial = [
                    "No specific preference",
                    "No preference",
                    "Not sure",
                  ].includes(option.text);

                  const isSpecialSelected = question.answers
                    .filter((opt) => currentAnswers.includes(opt.id))
                    .some((opt) =>
                      [
                        "No specific preference",
                        "No preference",
                        "Not sure",
                      ].includes(opt.text)
                    );

                  const isOptionSelected = currentAnswers.includes(option.id);

                  return (
                    <Checkbox
                      key={option.id}
                      value={option.id}
                      className={
                        lightMode ? "custom-checkbox-light" : "custom-checkbox"
                      }
                      disabled={
                        isOptionSelected
                          ? false // Always allow deselection
                          : isSpecialSelected || // A special is selected, block others
                            (isSpecial && currentAnswers.length > 0) || // Block special if normal is selected
                            currentAnswers.length >= 2 // Limit to 2
                      }
                    >
                      {option.text}
                    </Checkbox>
                  );
                })}
              </Space>
              <span
                className="fs-s-12"
                style={{
                  color: "#fff",
                  opacity: "0.8",
                }}
              >
                <span style={{ color: "red" }}>*&nbsp;</span>
                Up to 2 selections allowed
              </span>
            </div>
          </Checkbox.Group>
        ) : null}

        {/* {showCustomInput && (
          <TextArea
            placeholder="Please specify the trending sectors you're interested in"
            className={styles.customInput}
            value={customAnswer[question.id] || ""}
            onChange={(e) =>
              handleCustomInputChange(question.id, e.target.value)
            }
            rows={3}
          />
        )} */}

        {question.allowCustomInput && !question.answers.length && (
          <div className="d-flex flex-col align-items-end gap-10px">
            <TextArea
              placeholder="Enter your response here"
              className={
                lightMode ? styles.customInput_light : styles.customInput
              }
              value={customAnswer || ""}
              onChange={(e) =>
                handleCustomInputChange(question.id, e.target.value)
              }
              rows={4}
              maxLength={300}
            />
            <span
              className="fs-s-12"
              style={{
                color: "#fff",
                opacity: "0.8",
              }}
            >
              <span style={{ color: "red" }}>*&nbsp;</span>
              Max 300 characters
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <Modal
      open={isModalOpen && isOpen && toggleForm !== "verify_phone"}
      onCancel={onClose}
      width={830}
      footer={null}
      className={`${lightMode ? "survey-modal-light" : "survey-modal"}`}
      bodyStyle={{
        height: "700px",
        overflow: "auto",
      }}
    >
      <main
        className={
          lightMode ? styles.action_container_light : styles.action_container
        }
      >
        <div
          className={lightMode ? styles.surveyTitle_light : styles.surveyTitle}
        >
          <span>Feedback Form</span>
        </div>
        {loading ? (
          <div className={styles.loadingContainer}>
            <Spin size="large" />
          </div>
        ) : (
          <div className={styles.surveyContent}>
            {questions.length > 0 ? (
              <>
                <div className={styles.questionsContainer}>
                  {questions.map((question) => renderQuestion(question))}
                </div>

                <div className={styles.footerContainer}>
                  <Button onClick={handleSubmit} loading={submitting}>
                    <span
                      style={{
                        color: "white",
                      }}
                    >
                      Submit
                    </span>
                  </Button>
                </div>
              </>
            ) : (
              <div className={styles.noQuestionsMessage}>
                No survey questions available.
              </div>
            )}
          </div>
        )}
      </main>
    </Modal>
  );
};

export default SurveyModal;
