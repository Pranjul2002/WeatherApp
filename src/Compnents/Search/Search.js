import '../Search/searchStyle.css'

const Search = ({search, setSearch, handleSearch}) => {
    return (
        <div className="search">
            <input
                type="text"
                placeholder="Enter city name"
                name="search"
                value={search}
                onChange={(event)=>setSearch(event.target.value)}
            />

            <button onClick={handleSearch}>
                Search
            </button>
        </div>
    );
}
 
export default Search;