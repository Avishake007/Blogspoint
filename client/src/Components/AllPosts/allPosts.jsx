//Third Part imports
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
//Importing Stylesheets
import styles from "../../pages/Home/home.module.css";
//Importing SVGs from React Icons
import { FaAngleDown } from "react-icons/fa";
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from "react-icons/io";
import { ImCross } from "react-icons/im";
import BloggerBro from "../../assest/images/bloggerbro.jsx";
//Local Imports
import { getAllPosts } from "../../methods/crud/post";
import Loader from "../Loader/loader";
import Post from "../Post/post";

const AllPosts = ({ authenticate }) => {
  /**
   * UseStates Declarations
   */
  const [loader, setLoader] = useState(true);
  const [posts, setPosts] = useState([]);
  const [fliterPosts, setFilterPosts] = useState([]);

  const [showTags, setShowTags] = useState(false);
  const [all_posts, setAuto_posts] = useState([]);
  const [activeTags, setActiveTags] = useState([]);

  /**
   * Locations Declarations
   */
  const { search } = useLocation();
  /**
   * UseEffect Declarations
   */
  useEffect(() => {
    const fetchData = async () => {
      let data = await getAllPosts(search); // params in url
      setPosts(data);
      setAuto_posts(data);
      setFilterPosts(data);
      setLoader(false);
    };
    fetchData();
  }, []);

  //Function to filter by username
  const filterByUsername = (e) => {
    var curr_username = e.target.value + "";

    setFilterPosts(
      all_posts.filter((post) => {
        return (
          post.username.substring(0, curr_username?.length) === curr_username
        );
      })
    );

    if (!curr_username) setPosts(all_posts);
    else
      setPosts(
        all_posts.filter((post) => {
          return (
            post.username.substring(0, curr_username?.length) === curr_username
          );
        })
      );
  };

  //Function to filter posts by tags
  const filterByTags = (tag) => {
    setFilterPosts(
      fliterPosts.filter((post) => {
        return post?.categories.includes(tag) === true;
      })
    );

    setPosts(
      fliterPosts.filter((post) => {
        return post?.categories.includes(tag) === true;
      })
    );
  };

  //Function to include a tag in the activeTags State
  const activeTag = (tag) => {
    if (activeTags.includes(tag) === false) setActiveTags([...activeTags, tag]);
    filterByTags(tag);
  };

  //Function to toggle tags state between true and false
  const toggleTags = () => {
    var filteredPosts = [];
    if (showTags === true) setShowTags(false);
    else setShowTags(true);

    posts.map((post) => {
      for (var i = 0; i < post?.categories?.length; i++) {
        if (filteredPosts.includes(post?.categories[i]) === false)
          filteredPosts.push(post?.categories[i]);
      }
    });
  };
  //Function to filter by a tag
  const removeFilter = (tag) => {
    var filteredPosts = [];
    all_posts?.map((post) => {
      let flag = 1;
      for (var i = 0; i < activeTags?.length; i++) {
        if (
          activeTags[i] !== tag &&
          post?.categories.includes(activeTags[i]) === false
        ) {
          flag = 0;
          break;
        }
      }
      if (flag === 1) filteredPosts.push(post);
    });

    setPosts(filteredPosts);
    setFilterPosts(filteredPosts);
    if (activeTags?.length === 1) setPosts(all_posts);
  };
  //Function to delete a tag by index
  const removeTags = (_) => {
    setActiveTags(activeTags.filter((tag, index) => index !== _));
    removeFilter(activeTags[_]);
  };
  //Loader Functionality
  if (loader) <Loader />;
  return (
    <>
      <div className={`${styles.down_arrow}`}>
        <a href="#allPosts">
          <FaAngleDown />
        </a>
      </div>
      <div className={`${styles.allPosts}`} id="allPosts">
        {/* BloggerBro Image */}
        <div className={`${styles.blogger}`}>
          <BloggerBro />
        </div>
        {/* All Posts Section */}
        <div className={`${styles.outer_cover}`}>
          <p>Posts so far : </p>
          <div className={`${styles.inner_}`}>
            <div className={`${styles.inner_cover}`}>
              {/* Search bar */}
              <div className={`${styles.searchbox}`}>
                <input
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Search by username..."
                  onChange={filterByUsername}
                />
                {/* Tags  */}
                <div className={`${styles.tags}`} onClick={() => toggleTags()}>
                  Tags{" "}
                  <span>
                    {showTags === false ? (
                      <IoMdArrowDropdownCircle />
                    ) : (
                      <IoMdArrowDropupCircle />
                    )}
                  </span>
                </div>
              </div>
              {showTags === true && (
                <div className={`${styles.allTags}`}>
                  {all_posts?.length &&
                    all_posts?.map((post, _) =>
                      post?.categories.map((tag) => (
                        <div
                          className={`${styles.tag}`}
                          name={tag}
                          onClick={() => activeTag(tag)}
                        >
                          {tag}
                        </div>
                      ))
                    )}
                </div>
              )}

              <div className={`${styles.activeTags}`}>
                {activeTags?.map((tag, _) => (
                  <div className={`${styles.tagActive}`}>
                    {tag}
                    <span onClick={() => removeTags(_)}>
                      <ImCross />
                    </span>
                  </div>
                ))}
              </div>
              {/* Posts Section */}
              {posts?.length ? (
                posts?.map((post, _) => (
                  <Post post={post} key={_} authenticate={authenticate} />
                ))
              ) : (
                <div
                  style={{ color: "878787", margin: "30px 80px", fontSize: 18 }}
                >
                  No data is available for selected category
                </div>
              )}
              
            </div>
          </div>
          <div className={`${styles.shady}`}></div>
        </div>
      </div>
    </>
  );
};

export default AllPosts;
