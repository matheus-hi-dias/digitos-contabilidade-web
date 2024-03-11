import List from "../../components/List";
import ListItem from "../../components/ListItem";
import "./styles.scss";

const DocumentType = () => {
  const documentTypeList = [
    { id: 1, cod_tipo_doc: 1, tipo_doc: "Recibo", temp_arquivamento: 5 },
    { id: 2, cod_tipo_doc: 1, tipo_doc: "Nota Fiscal", temp_arquivamento: 5 },
  ];
  return (
    <div className="documentTypeLayout">
      <div className="documentSearchAddContainer"></div>
      <div className="documentTypeListContainer">
        <List>
          {documentTypeList.map((item) => {
            return <ListItem description={item.tipo_doc} key={item.id} />;
          })}
        </List>
      </div>
    </div>
  );
};

export default DocumentType;
