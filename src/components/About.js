import React, { useContext } from "react";
import { context } from "../App";

export default function About() {
    const contexx=useContext(context);
  return (
    <div className="container w-75 text-center" style={{marginTop:"5vh"}}>
      <table className={`table table-${contexx.theme.color!=="#000"?"dark":"light"} table-striped-columns`}>
        <tbody>
          <tr>
            <th scope="row">What is NewNews</th>
            <td>It is a new News platform made to keep you updated on current affairs from each and every field like politics, sports, events, weather, etc. Just visit and you are ready to read!</td>
          </tr>
          <tr>
            <th scope="row">Developed By</th>
            <td>Gaurav Lonari</td>
          </tr>
          <tr>
            <th scope="row">Original Idea</th>
            <td>CodeWithHarry - React Tutorials</td>
          </tr>
          <tr>
            <th scope="row">Framework and Tools Used</th>
            <td>ReactJS, NodeJS, Bootstrap, Sass, Gsap, gh-pages</td>
          </tr>
          <tr>
            <th scope="row">Source code Repository</th>
            <td><a className="link-secondary" href="https://www.github.com/gauravlonari/NewNews" rel="noreferrer" target="_blank">NewNews Repository</a></td>
          </tr>
          <tr>
            <th scope="row">Github</th>
            <td><a className="link-secondary" href="https://www.github.com/gauravlonari" rel="noreferrer" target="_blank">gauravlonari</a></td>
          </tr>
          <tr>
            <th scope="row">LinkedIn</th>
            <td><a className="link-secondary" href="https://www.linkedin.com/in/gauravlonari" rel="noreferrer" target="_blank">gauravlonari</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
