import "./App.css";
import Axios from "axios";
import { useEffect, useState } from "react";

function App() {
  // Setting up the initial states using
  // react hook 'useState'
  const [search, setSearch] = useState("");
  const [crypto, setCrypto] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // Fetching crypto data from the API only
  // once when the component is mounted
  useEffect(() => {
    Axios.get(
      `https://api.coinstats.app/public/v1/coins?skip=0&limit=100¤cy=INR`
    ).then((res) => {
      setCrypto(res.data.coins);
    });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = crypto.slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(crypto.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="App">
      <h1>All Cryptocurrencies</h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <table>
        <thead>
          <tr>
            <td>Rank</td>
            <td>Name</td>
            <td>Symbol</td>
            <td>Market Cap</td>
            <td>Price</td>
            <td>Available Supply</td>
            <td>Volume(24hrs)</td>
          </tr>
        </thead>
        {/* Mapping all the cryptos */}
        <tbody>
          {/* Filtering to check for the searched crypto */}
          {currentItems
            .filter((val) => {
              return val.name.toLowerCase().includes(search.toLowerCase());
            })
            .map((val, id) => {
              return (
                <>
                  <tr key={id} id={id}>
                    <td className="rank">{val.rank}</td>
                    <td className="logo">
                      <a href={val.websiteUrl}>
                        <img src={val.icon} alt="logo" width="30px" />
                      </a>

                      <p>{val.name}</p>
                    </td>
                    <td className="symbol">{val.symbol}</td>
                    <td>₹{val.marketCap}</td>
                    <td>₹{val.price.toFixed(2)}</td>
                    <td>{val.availableSupply}</td>
                    <td>{Number(val.volume).toFixed(0)}</td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
      <nav>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <a
                onClick={() => paginate(number)}
                href="!#"
                className="page-link">
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default App;
