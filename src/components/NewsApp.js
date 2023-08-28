import React, { useEffect, useState, useRef } from 'react'
import News from './News';
import './NewsApp.css'

function NewsApp() {

    //News Api
    const apiKey = '720a899c876142118394e1144cc5ad09';
    // const apiUrl = `https://newsapi.org/v2/everything?q=${query}&from=2023-06-15&sortBy=publishedAt&apiKey=${apiKey}`

    //Bitcoin API
    // const bitApi = 'https://api.coingecko.com/api/v3/exchange_rates'

    //Money exchange API
    // const MoneyExchangeAPI= 'https://open.er-api.com/v6/latest/USD'

//    const [TitleData, setTitleData] = useState([query]);
   const [query, setQuery] = useState("tesla");
   const [TitleData, setTitleData] = useState([query]);

//    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&from=2023-06-15&sortBy=publishedAt&apiKey=${apiKey}`
//    const apiUrl=`https://newsapi.org/v2/everything?q=${query}&from=2023-06-20&sortBy=publishedAt&apiKey=720a899c876142118394e1144cc5ad09`
   const apiUrl= `https://newsapi.org/v2/everything?q=${query}&from=2023-07-28&sortBy=publishedAt&apiKey=720a899c876142118394e1144cc5ad09`


   const queryInputRef = useRef(null);
  
   useEffect(()=>{
    fetchData();
   },[query]);

  
    async function fetchData()
    {
        try{
        const response = await fetch(apiUrl);
        const jsonData = await response.json();

        setTitleData(jsonData.articles);   
        console.log(jsonData.articles);
    }
    catch(e){
    console.log(e,"Error in fetching data");
   }
}
    function handleSubmit(event){
        event.preventDefault();
       const queryValue = queryInputRef.current.value;
       setQuery(queryValue);
    }
  return (
    <div className="news-app">
        <h1 style={{fontFamily:'monospace', fontSize: '3rem', textAlign: 'left', marginBottom: '20px'}}>News Daily</h1>
        <form onSubmit={handleSubmit}>
            <input className="query-input" type="text" ref={queryInputRef}/>
            <input className="btn-submit" onClick={handleSubmit} type="submit" value="Submit" />      
        </form>
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 48%)', justifyContent: 'space-between', rowGap: '20px'}}>
        {TitleData.map((news)=>{
            // return <p>{news.title}</p>
            return <News key={news.url} news={news}/>;
        })}
    </div>
    </div>
  );
}

export default NewsApp