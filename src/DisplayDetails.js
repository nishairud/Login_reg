import React, { Component } from 'react';
import Pagination from "react-js-pagination";
import ReactPaginate from 'react-paginate';
class DisplayDetails extends Component {

    constructor(props) {
        super(props);
        this.fetchMemberInfo = this.fetchMemberInfo.bind(this);

    }
    fetchMemberInfo(e,member){
        e.preventDefault();
        console.log("inside fetccchh",e);
        //const mem = e.currentTarget.getAttribute('data-value'); //e.currentTarget
        //console.log(mem); passing only id
        console.log(member); //passing the object
        this.props.fetchMemInfo(member);
    }
    render() {
        return(
            <div>
                
                {(this.props.submittedUserName != "") && 
                <h3> the username entered is  {this.props.submittedUserName} </h3>
                }
                {////console.log("after username display", this.props.details)
                }
                
      
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Password</th>
                        </tr>
                    </thead>
                    <tbody>
                   {/*<Pagination
 activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={450}
          pageRangeDisplayed={5}
         onChange={::this.handlePageChange}
                   />
                   <ReactPaginate
                   previousLabel={'previous'}
                   nextLabel={'next'}
                   breakLabel={'...'}
                   breakClassName={'break-me'}
                   pageCount={5}
                   marginPagesDisplayed={2}
                   pageRangeDisplayed={5}
                   //onPageChange={this.handlePageClick}
                   containerClassName={'pagination'}
                   subContainerClassName={'pages pagination'}
                   activeClassName={'active'}
                   />*/}  
                    
                    {this.props.details.map(member =>
                    
                        <tr key={member.id} >
                        <td><a href='#' data-value={member.id} onClick={(e)=>this.fetchMemberInfo(e,member)}>{member.id}</a></td>
                        <td>{member.name} </td>
                        <td>{member.password}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
 
                </div>            
            
                )
        
    }
}
export default DisplayDetails;