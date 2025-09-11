import "./searchBar.css";
//Vamos a crear el componente SearchBar que permitirá buscar mariposas y filtrar dependiendo las opciones que queramos.
const SearchBar = ({
  onSearchChange,
  onRegionChange,
  onThreatChange,
  onClearAll,
}) => {
  //Recibirá por ahora dos props:
  //onSearchChange se usará cuando alguien escriba en la barra de búsqueda.
  // onRegionChange se usará cuando alguien haga clic en un botón de región.
  return (
    <div className="searchContainer">
      <input className="searchBarinput" //Barra de búsqueda normal
        type="text"
        placeholder="Buscar mariposas..."
        onChange={(e) => onSearchChange(e.target.value)} // onChange: Va detectar el cambio, se activa automáticamente (es una propiedad del input). e.target.value = recoge el valor de lo que se está escribiendo en el input.
      /> <br></br>
      <div className="filterOptions">
      <button className="allButton" onClick={onClearAll}>Todas</button>
      <div className="regionContainer">
        <p className="threatTitle">Ubicación</p>
        <div className="regionButtons">
          <button onClick={() => onRegionChange("Australia")}>Australia</button>
          <button onClick={() => onRegionChange("Nueva Zelanda")}>
            Nueva Zelanda
          </button>
          <button onClick={() => onRegionChange("Islas del Pacífico")}>
            Islas del Pacífico
          </button>
        </div>
      </div>
      <div className="threatContainer">
        <p className="threatTitle">Tipo de Amenaza</p>
        <div className="threatButtons">
          <button onClick={() => onThreatChange("Vulnerable")}>
            Vulnerable
          </button>
          <button onClick={() => onThreatChange("Preocupación menor")}>
            Preocupación menor
          </button>
          <button onClick={() => onThreatChange("En peligro crítico")}>
            En peligro crítico
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default SearchBar;
