import React, { Component } from 'react';

import Header from '../header';
import NavBar from '../nav-bar';

import People from './people';



import * as actions from '../../actions';
import { connect } from 'react-redux';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      buttonClick: false
    }



  }



  componentWillMount() {
    this.props.dispatch(actions.fetchUsers());
    // const search = this.props.location.search;
    // if(search === '' ) {
    //   return null;
    // } else {
    //   if(search.includes('+')) {
    //     const qW = search.split('=')[1];
    //     const sArr = qW.split('+');
    //     let words = '';
    //     sArr.map((word)=>{
    //       return words = `${words} ${word}`;
    //     });
    //     words = words.trim();
    //     this.setState({searchTerm:words});
    //     this.setState({buttonClick:true});
    //     console.log(words);
    //     console.log(this.state.searchTerm);
    //
    //   }else {
    //     this.setState({searchTerm:search});
    //     this.setState({buttonClick:true});
    //
    //   }
    //
    // }
  }



handleSubmit(e) {
  e.preventDefault();
  if(this.state.searchTerm.trim() === '') {
    return;
  }
  this.setState({buttonClick:true});
}





  render() {



    return(
      <div>
        <Header/>
        <NavBar/>
        <div className="main-home">
        <div className="search">

        <form onSubmit={(e)=>this.handleSubmit(e)} >
        <input name="people" className="box" value={this.state.searchTerm} onChange={(e)=>{this.setState({searchTerm:e.target.value})}} type="search" placeholder=" Try 'Username' or 'Name' "/>
        <button className="search-btn"><i className="fas fa-search"></i></button>
        </form>
        </div>



        { this.state.buttonClick
          ?
          <div className="people-block">
          <People users={this.props.users} searchName={this.state.searchTerm} errors={this.props.errors} />
          </div>
          :
          <div></div>
        }





        </div>

      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
    users: state.users.data,
    errors: state.users.errors
  }
}

export default connect(mapStateToProps)(Home);
