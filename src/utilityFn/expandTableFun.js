export default function transformData(data, nestedData) {
  if (!data) {
    return [];
  }
  const dataKeysToFilter = [];
  // Helper function to recursively transform the data
  function transform(data, nestedData) {
    return data.map((item) => {
      const children = nestedData[item?.PARTICULARS];
      if (children) {
        const transformedChildren = Array.isArray(children)
          ? transformChildren(item, children)
          : transform(data, children);
        return { ...item, children: transformedChildren };
      }
      return item;
    });
  }

  // Helper function to transform children data
  function transformChildren(parentItem, children) {
    return children.map((child) => {
      let childValue = child;
      let dataNew = [...data];
      if (
        typeof childValue === "object" &&
        !Array.isArray(childValue) &&
        childValue !== null
      ) {
        dataNew = transform(data, childValue);
        childValue = Object.keys(childValue)[0];
      }

      const item = dataNew.find((d) => d.PARTICULARS === childValue);

      const temp = { ...item };
      dataKeysToFilter.push(item?.key);

      return { ...temp, tooltipText: parentItem.tooltipText };
    });
  }
  const output = transform(data, nestedData);

  return output.filter((item) => !dataKeysToFilter.includes(item?.key));
}
