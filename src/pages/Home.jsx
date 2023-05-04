import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBTypography, MDBBtn, MDBIcon} from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts, setCurrentPage } from '../redux/features/postsSlice';
import CardPost from '../components/CardPost';
import Spinner from '../components/Spinner';
import Pagination from '../components/Paginate';



const Home = () => {
  const { posts, loading, currentPage, numberOfPages } = useSelector(
    (state) => ({
      ...state.post,
    })
  );

 
  const dispatch = useDispatch();
  const [all, setAll]=useState(true);
  const [searchW, setSearch]=useState('');
  const [best, setBest]=useState(false);

  useEffect(() => {
    let timeout=0;
    if(searchW){
      timeout=setTimeout(() => {
        dispatch(getAllPosts({searchW,currentPage}));
      }, 1500);
      return () => clearTimeout(timeout);
    }
    if(!searchW){
      dispatch(getAllPosts({searchW,currentPage}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchW,currentPage]);


  const handleAll=()=>{
    setAll(true)
    setSearch('')
    setBest(false)
  }
  const handleSearch=(e)=>{
    setSearch(e.target.value);
  }

  const handleBest=()=>{
     setBest(true)
     setAll(false)
  }


  if (loading) {
    return <Spinner />;
  }

  return(
    <div style={{minHeight:'100vh'}}>
      {posts.length === 0 ? (
        <div style={{marginTop:'200px'}}>
          <MDBTypography className="text-center mt-10 mb-0" tag="h4">
             Sorry, no post found!
          </MDBTypography>
          {searchW && <MDBBtn
              tag="a"
              color="none"
              className="text-uppercase font-weight-bold px-3 py-2"
              style={{color: '#000' }}
              onClick={() => window.location.reload()} 
            >
            <MDBIcon
              fas
              size="lg"
              icon="long-arrow-alt-left"
              className="mr-2"
            />
            <p className="mr-5">Back to all posts</p>
         </MDBBtn>}
        </div>
      ):
      <MDBContainer  style={{marginTop:'120px', height:'auto'}}>
      <MDBRow>
         <form className="d-flex justify-content-end">
              <input
                type="text"
                name="search"
                placeholder="Search"
                value={searchW}
                onChange={handleSearch}
                className='search-bar'
              />
              <button type='button' className='bttn-search '><i class="fas fa-search"></i></button>
          </form>
        </MDBRow>
        <MDBRow>
         <MDBCol md='9'>      
            <div style={{width:'100%', marginTop:'5px'}}>
             <div className='d-flex square border-bottom mt-5'>
              <button className='me-5' style={{ border: 'none', background:"none", color:'blue'}} onClick={()=>handleAll()}>All</button>
              <button style={{border: 'none', background:"none",color:'blue'}} onClick={()=>handleBest()}>Best</button>
             </div>
              {all? <CardPost posts={posts?posts:[]}/>: 'Sorry, not yet developed'}
              <nav aria-label='Page navigation'>
               {posts.length > 0 && (
                <Pagination
                  setCurrentPage={setCurrentPage}
                  numberOfPages={numberOfPages}
                  currentPage={currentPage}
                  dispatch={dispatch}
                />
               )}
              </nav>
            </div>
         </MDBCol>
       </MDBRow>
      </MDBContainer>
      }
    </div>
  )
};

export default Home;


