import ItemList from "../../components/ItemList";
import "./styles.scss";

const DocumentType = () => {
  return (
    <div className="documentTypeLayout">
      <div className="documentSearchAddContainer"></div>
      <ItemList containerClassName={"documentTypeListContainer"}>

      </ItemList>
    </div>
  );
};

export default DocumentType;
