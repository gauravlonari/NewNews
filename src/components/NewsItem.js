import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// import {Link} from 'react-router-dom';
import NoImage from '../other/No_Image.jpg';
import { context } from '../App';


export default function NewsItem(props){
  let contexx =useContext(context);

    let {title,imageUrl,desc,newsId,time,author,source}=props;
    return (
      <>
         <div className={`card text-bg-${contexx.theme.color!=="#000"?"dark":"light"}`} style={{width: "18rem",margin:"10px"}}>
          <img src={imageUrl} style={{height:"150px"}} onError={(e)=>{e.target.onerror=null; e.target.src=NoImage}} className="card-img-top" alt="ErrorLoadingPhoto"/>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{desc}</p>
            <p className="card-text"><small className="text-muted">By {author?author.split(" ")[0]:"Unknown"} on {new Date(time).toUTCString()}</small></p>
            {/* <Link to={`/newsdetail/?newsid=${newsId}`} className="btn btn-sm btn-primary w-100">Read More</Link> */}
            <a href={newsId} rel="noreferrer" target="_blank" className={`btn btn-sm btn-${contexx.theme.color==="#000"?"dark":"light"} w-100`}>Read More</a>
            <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
              {source}
            </span>
        </div>
        </div>
      </>
    )
}

NewsItem.propTypes={
  title:PropTypes.string.isRequired,
  imageUrl:PropTypes.string.isRequired,
  desc:PropTypes.string.isRequired,
}