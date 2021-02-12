import React from "react";
import "./style.css";
import { Input } from 'antd';


function SearchForm(props) {
  return (
    <form className="search">
      <div >

        <Input onChange={props.handleInputChange}
          value={props.search}
          name="search"
          type="text"
          className="form-control"
          id="search" style={{ width: '250px', float: "right", marginRight: "82px"}} placeholder="Search Coin by Name"/>
        <datalist id="coin">
          {props.coin.map(coin => (
            <option value={coin} key={coin} />
          ))}
        </datalist>
    
      </div>
    </form>
  );
}

export default SearchForm;
