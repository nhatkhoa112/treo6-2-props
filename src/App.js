import React, { useState } from "react";
import {
  Row,
  Col,
  Nav,
  Form,
  Card,
  Button,
  Navbar,
  Container,
  ListGroup,
  FormControl,
  ListGroupItem,
} from "react-bootstrap";

import "./App.css";

import { COMMENTS } from './utils'

import Modal from "react-modal";

import { Toggle } from './components/Toggle';
import { useDarkMode } from './styles/useDarkMode';
import { GlobalStyles, lightTheme, darkTheme } from './styles/globalStyles';
import styled, { ThemeProvider } from 'styled-components';



const Avatar = (props) => {
  return (
    <img
      alt="profile"
      className="rounded-circle"
      style={{height: 50, width: 50 }}
      src={
        "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
      }
    />
  );
};

const PostForm = ({posts, setPosts, currentUser}) => {
  const [searchTerm, setSearchTerm] =useState('');
  const handleOnClick = (e) => {
    if(currentUser.email !== ""){
      e.preventDefault();
      setPosts([...posts, {
        id: Math.random()*1000000000000,
        text: searchTerm
      }])
    };
    setSearchTerm("")
  }
  return (
    <Form inline className="d-flex align-items-center">
      <Form.Control
        type="text"
        className="mr-3"
        style={{width: '90%'}}
        placeholder={`What's on your mind ${currentUser.email}?`}
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      <Button onClick={handleOnClick} variant="primary" type="submit">
        Post!
      </Button>
    </Form>
  );
}

const CommentForm = (props) => {
  return (
    <Form inline>
      <Form.Control type="text" 
                    placeholder={`Whats on your mind ${props.currentUser.email}?`}
                    className="w-75 mr-3" />
      <Button variant="primary" type="submit">
        Post!
      </Button>
    </Form>
  );
}

const Comment = ({ body, user }) => {
  return (
    <ListGroupItem className="d-flex flex-row align-items-center border-bottom-0 pr-0 py-0">
      <Avatar url={user.avatarUrl} />
      <div className="col">
        <div className="comment-bubble">
          <div className="font-weight-bold">{user.name}</div>
          <p>{body}</p>
        </div>
      </div>
      <hr />
    </ListGroupItem>
  );
};

const Comments = (props) => {
  return (
    <Card.Body>
      <ListGroup className="list-group-flush py-3">
        {props.comments.map((c) => (
          <Comment key={c.id} {...c} />
        ))}
      </ListGroup>
    </Card.Body>
  );

  
};



const Post = (props) => {
  const {currentUser} =  props;
  console.log(props.posts)
  return (
    <Card className="post-card" style={{ width: "100%", height: "100vh", padding: "1%" }}>
      <div className="post-form">
        <div className="user text-center">
          <div><strong>{props.currentUser.email}</strong></div>
        </div>
        <div className="post-list">
          <Card.Title>{props.posts.reverse().map(m=> <div className="post-items" key={m.id}>{m.text}</div>)}</Card.Title>
        </div>
        {/* <Card.Img
          variant="top"
          src="https://images.unsplash.com/photo-1534665482403-a909d0d97c67?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80"
        /> */}
      </div>

      <Card.Body className="comment-form">
        <Comments  comments={COMMENTS} />
        <CommentForm currentUser={currentUser} />
      </Card.Body>
    </Card>
  );
}

const Navbarr = (props) => {
  const [email, setEmail] = useState('')
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Prop Drilling</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
        </Nav>
        {!props.currentUser.email ? (
            <Form inline onSubmit={(e) => props.onSignIn(e, email)}>
              <FormControl
                type="text"
                placeholder="Email"
                className="mr-sm-2"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <Button type="submit" variant="outline-success">
                Sign In
              </Button>
            </Form>
          ) : (
            <Button onClick={props.onSignOut} type="submit" variant="outline-danger">
              Sign Out {props.currentUser.email}
            </Button>
          )
        }
      </Navbar.Collapse>
    </Navbar>
  );
};



const Friends = (props) => {
  return (
    <div className="d-flex flex-column h-25 border w-100 align-items-start justify-content-around pl-3 mb-3">
      Friends: {props.currentUser.friends}
    </div>
  );
}
const Photos = (props) => {
  return (
    <div className="d-flex flex-column h-25 border w-100 align-items-start justify-content-around pl-3 mb-3">
    <img src={props.currentUser.photos_url} style={{width:"150px"}} alt="photo" />
    </div>
  );
}

const Hobbies = (props) => {
  return (
    <div className="d-flex flex-column h-25 border w-100 align-items-start justify-content-around pl-3 mb-3">
      Hobbies: {props.currentUser.hobbies}
    </div>
  );
};
const Intro = (props) => {
  return (
    <div className="d-flex flex-column h-25 border w-100 align-items-start justify-content-around pl-3 mb-3">
      Introduction
      <button onClick={props.openModal} className="w-25">Edit Details</button>
    </div>
  );
};

const Left = (props) => {

  const [open, setOpen] = React.useState(false);
  function openModal() {
    if(props.currentUser.email !== ""){
      setOpen(true);
    }
  }


  function closeModal() {
    setOpen(false);
  }


  return (
    <Col className="d-flex flex-column align-items-center justify-content-center">
      <Intro openModal={openModal} />
      <Hobbies currentUser={props.currentUser} />
      <Photos currentUser={props.currentUser}/>
      <Friends currentUser={props.currentUser} />
      <Modal
        isOpen={open}
        // style={customStyles} 
        onRequestClose={closeModal} 
        contentLabel="Example Modal"
      >
        <div className="modal-card">
          <h1 className="title text-center ">Edit Detail!</h1>
          <div className="email-detail">
            <form >
              <h4>Email</h4>
              <input type="text" className="input"  value={props.currentUser.email} onChange={props.updateEmail} />
            </form>
          </div>  
          <div className="email-detail">
            <form >
              <h4>Hobbies</h4>
              <textarea type="text" className="input" value={props.currentUser.hobbies} onChange={props.updateHobbies} />
            </form>
          </div>  
          <div className="email-detail">
            <form >
              <h4>Photos_url</h4>
              <input type="text" className="input"  value={props.currentUser.photos_url} onChange={props.updatePhotos} />
            </form>
          </div>  
          <div className="email-detail">
          <form >
            <h4>Friends</h4>
            <textarea type="text" className="input"  value={props.currentUser.friends} onChange={props.updateFriends} />
          </form>
        </div>  
        <div className="d-flex justify-content-center">
          <button className="submit-btn" onClick={closeModal}>Submit</button>
        </div>
          
        </div>
      </Modal>
    </Col>
  );
}

const Right = ({posts, currentUser}) => {
  return (
    <Col className="d-flex align-items-center justify-content-center">
      <Post posts={posts} currentUser={currentUser} />
    </Col>
  )
}

const Main = (props) => {
    const {updateHobbies, updatePhotos, updateFriends, currentUser} = props;
    const [posts, setPosts] = useState([]);
    console.log(posts)
  return (
    <Container className="border pt-5 mt-5">
      <Row className="mb-5">
        <Col>
          <PostForm posts={posts} setPosts={setPosts} currentUser={currentUser} />
        </Col>
      </Row>
      <Row className="content">
        <Left updateHobbies={updateHobbies} updatePhotos={updatePhotos} updateFriends={updateFriends} currentUser={currentUser} updateEmail={props.updateEmail} />
        <Right posts={posts} currentUser={currentUser}  />
      </Row>
    </Container>
  );
};

function App() {
  const [currentUser, setCurrentUser] = useState({ email: "",  
                                                  hobbies: "", 
                                                  photos_url: "", 
                                                  friends: ""});

  

  const updateEmail = (e) => {
    e.preventDefault();
    setCurrentUser({...currentUser, email: e.target.value });
};


  const updateHobbies = (e) => {
    e.preventDefault();
    setCurrentUser({...currentUser, hobbies: e.target.value });
};


  const updatePhotos = (e) => {
    e.preventDefault();
    setCurrentUser({...currentUser, photos_url: e.target.value });
};


  const updateFriends = (e) => {
    e.preventDefault();
    setCurrentUser({...currentUser, friends: e.target.value });
};

  const onSignIn = (e, email) => {
    e.preventDefault()
    setCurrentUser({...currentUser,  email: email })
  }

  const onSignOut = () => {
    setCurrentUser({...currentUser, email: ""})
  }

  const [ theme, toggleTheme ] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <div className="main">
        <Navbarr  onSignOut={onSignOut} currentUser = {currentUser} onSignIn={onSignIn} />
        <div className="toggle">
          <Toggle theme={theme} toggleTheme={toggleTheme} />
        </div>
        <Main updateHobbies={updateHobbies} updatePhotos={updatePhotos} updateFriends={updateFriends} updateEmail={updateEmail} currentUser = {currentUser} />
      </div>
    </ThemeProvider>
  );
}

export default App;
