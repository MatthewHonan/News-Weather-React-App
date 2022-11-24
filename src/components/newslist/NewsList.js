import React, {useState, useEffect} from 'react'
import axios from 'axios';
import NewsItem from './NewsItem';
import { NEWS_API_KEY, NEWS_API_URL } from '../../api';
const NewsList = () => {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        const getArticles = async ()=> {
            const response = await axios.get(`${NEWS_API_URL}${NEWS_API_KEY}`)
            console.log(response)
            setArticles(response.data.articles)
        }
        getArticles();
    }, [])
  return (
    <div>
      {articles.map(article => {
        return (
            <NewsItem 
                title = {article.title}
                description = {article.description}
                url = {article.url}
                urlToImage = {article.urlToImage}
            />
        )
      })}
    </div>
  )
}

export default NewsList
