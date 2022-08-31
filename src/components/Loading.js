import React from 'react';
import loading from "../other/loading.gif";

export default function Loading(){
    return (
      <div className="w-100 text-center">
        <img src={loading} alt="loading gif" />
      </div>
    )
}
