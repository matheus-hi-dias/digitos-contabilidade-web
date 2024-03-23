import './styles.scss';

function List({ containerClassName, children }) {
  return (
    <div className={`itemListComponentClass ${containerClassName}`}>
      {children}
    </div>
  );
}
export default List;
