/**
 * @Component_name All Posts
 * @Desc It shows the post details of all users
 */
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
   * @UseStates_Declarations
   */
  /**
   * @State_Name Loader
   * @Func It shows the loading Page until the page is fully loaded
   * @Type Boolean
   */
  const [loader, setLoader] = useState(true);
  /**
   * @State_Name Posts
   * @Func It stores the post details of all the users
   * @Type Array
   */
  const [posts, setPosts] = useState([]);
  /**
   * @State_Name FilterPosts
   * @Func It stores the filtered post details
   * @Type Array
   */
  const [fliterPosts, setFilterPosts] = useState([]);
  /**
   * @State_Name ShowTags
   * @Func It decides whether to show tags or not
   * @Type Boolean
   */
  const [showTags, setShowTags] = useState(false);
  /**
   * @State_Name AllPosts
   * @Func It stores all the posts
   * @Type Array
   */
  const [all_posts, setAllPosts] = useState([]);
  /**
   * @State_Name ActiveTags
   * @Func It stores all the active tags
   */
  const [activeTags, setActiveTags] = useState([]);

  /**
   * @Location_Declaration
   */
  const { search } = useLocation();
  /**
   * @UseEffect_Declaration
   */
  useEffect(() => {
    /**
     * @Function_Name Fetch Data
     * @Desc It fetches all posts stores it in posts,allPosts,filterPosts and toggles the value of loader to false
     * @Return_Type void
     */
    const fetchData = async () => {
      let data = await getAllPosts(search); // params in url
      setPosts(data?.posts);
      setAllPosts(data?.posts);
      setFilterPosts(data?.posts);
      setLoader(false);
    };
    fetchData();
  }, [search]);

  /**
   * @Function_Name FilterByUsername
   * @Desc It filters all the post according the username
   * @Return_Type void
   */
  const filterByUsername = (e) => {
    var curr_username = e.target.value + "";
    //It stores the filtered posts to filter posts state
    setFilterPosts(
      all_posts.filter((post) => {
        return (
          post.username.substring(0, curr_username?.length) === curr_username
        );
      })
    );
    //If curr_username is empty then store all the posts in posts state else store the filtered post to all posts
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

  /**
   * @Function_Name FilterByTags
   * @Desc It filters all the post according the active tags
   * @Return_Type void
   */
  const filterByTags = (tag) => {
    //It stores the filtered post to filterPosts state
    setFilterPosts(
      fliterPosts.filter((post) => {
        return post?.categories.includes(tag) === true;
      })
    );
    //It stores the filtered posts to posts state
    setPosts(
      fliterPosts.filter((post) => {
        return post?.categories.includes(tag) === true;
      })
    );
  };

  /**
   * @Function_Name ActiveTags
   * @Desc It stores the active tags to active tags state if not present
   * @Return_Type void
   */
  const activeTag = (tag) => {
    if (activeTags.includes(tag) === false) setActiveTags([...activeTags, tag]);
    filterByTags(tag);
  };

  /**
   * @Function_Name FilterByUsername
   * @Desc It toggles showTags state and filter posts according to tags
   * @Return_Type void
   */
  const toggleTags = () => {
    //Toggles showTags feature
    if (showTags === true) setShowTags(false);
    else setShowTags(true);
  };
  /**
   * @Function_Name RemoveFilter
   * @Desc It removes the filtered property of tags in post when you click on the cross icon of active tag
   * @Return_Type void
   */
  const removeFilter = (tag) => {
    var filteredPosts = [];
    //Remove the non active filter tag from the filtered posts
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
  /***
   * @Function_Name removeTags
   * @Desc Removes the tags from active state through its id and then calls the removeFilter function
   */
  const removeTags = (_) => {
    setActiveTags(activeTags.filter((tag, index) => index !== _));
    removeFilter(activeTags[_]);
  };
  //Shows loader Page when the page is loading
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
          // Active Tags
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
          <div className={`${styles.inner_}`}>
            <div className={`${styles.inner_cover}`}>
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
