import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/ContextWrapper";
import { Link } from "react-router-dom";

export const NavBar = ()=>{
  const store = useContext(AppContext)
    return(
        <nav class="navbar navbar-expand-lg bg-black">
          <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
              <a class="navbar-brand" href="#">Hidden brand</a>
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <Link class="nav-link active" aria-current="page" to={"/"}>Home</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to={"/dashboard "}>Dashboard</Link>
                </li>
                <li class="nav-item">
                  <a class="nav-link disabled" aria-disabled="false">{store.name}</a>
                </li>
              </ul>
              <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button class="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
          </div>
        </nav>
    )
}