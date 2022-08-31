import React from 'react'
import { capitalize } from './CommonFunctions'


export default function Alert(props) {

  return (
    <div style={{height:"45px",zIndex:1}} className="container sticky-top">
        {props.alert && <div className={`alert alert-primary alert-${props.alert.type}`} role="alert">
            <strong>{props.alert.type==="danger"?"Error":capitalize(props.alert.type)}</strong>: {props.alert.msg}
        </div>} 
    </div>
  )
}