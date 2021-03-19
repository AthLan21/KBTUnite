import React  from 'react';
import './LatestNews.css';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';


const newsArticle = (heading, subtitle) => (
    <div className ='newsArticle'>
      <div className='newsArticle_left'>
        <LibraryBooksIcon/>
      </div>
      <div className='newsArticle_right'>
        <h4>{heading}</h4>
        <p>{subtitle}</p>
      </div>
    </div>
  )

function LatestNews(){
    return (
        <div className='LatestNews'>
            <div className='LatestNews__header'>
                <LibraryBooksIcon/>
                <h2>Latest News</h2>
            </div>
            {newsArticle ('RCB Won IPL','ababhabshabs')}
            {newsArticle ('Exams to be conducted online','asansjanuwwdx')}
            {newsArticle ('College organizing events','hhudhudn')}
            {newsArticle ('Webinar on XYZ','kjkwjdihhhhd')}
            {newsArticle ('ABC Company campus-drive!!!','jkjsdjskd')}
      </div>
    );
}

export default LatestNews;