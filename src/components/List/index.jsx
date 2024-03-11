import "./styles.scss";
const List = ({ containerClassName, children }) => {
  return (
    <div className={`itemListComponentClass ${containerClassName}`}>
      {children}
    </div>
  );
};
export default List;
