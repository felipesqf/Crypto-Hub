import React from "react";
import { MDBCard, MDBCardTitle, MDBBtn, MDBCardGroup, MDBCardImage, MDBCardText, MDBCardBody } from "mdbreact";


const Card = (props) =>{
	return (
		<MDBCardGroup>
		<MDBCard>
		  <MDBCardImage src={props.results.image} alt="MDBCard image cap" top hover
			overlay="white-slight" />
		  <MDBCardBody>
			<MDBCardTitle tag="h5">Panel title</MDBCardTitle>
			<MDBCardText>
			  Some quick example text to build on the card title and make up
			  the bulk of the card's content.
			</MDBCardText>
			<MDBBtn color="primary" size="md">
			  read more
			</MDBBtn>
		  </MDBCardBody>
		</MDBCard>
	  </MDBCardGroup>
	);
  }
  
  export default Card;


