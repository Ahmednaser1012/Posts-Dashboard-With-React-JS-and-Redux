import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  loading: false,
  error: null,
  currentPage: 1,
  postsPerPage: 10,
  searchTerm: '',
  totalPosts: 0,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
   
    fetchPostsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPostsSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
      state.totalPosts = action.payload.length;
    },
    fetchPostsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    
    addPostSuccess: (state, action) => {
      state.posts.unshift(action.payload);
      state.totalPosts += 1;
    },

    
    updatePostSuccess: (state, action) => {
      const index = state.posts.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },

  
    deletePostSuccess: (state, action) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
      state.totalPosts -= 1;
    },

   
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },

    
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = 1; 
    },

      clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  addPostSuccess,
  updatePostSuccess,
  deletePostSuccess,
  setCurrentPage,
  setSearchTerm,
  clearError,
} = dataSlice.actions;

// Fallback data in case API fails
const fallbackPosts = [
  {
    id: 1,
    title: "Welcome to the Admin Panel",
    body: "This is a sample post to demonstrate the functionality of the admin panel. You can add, edit, and delete posts here.",
    userId: 1
  },
  {
    id: 2,
    title: "Getting Started Guide",
    body: "Learn how to use all the features of this admin panel. Navigate through different sections using the sidebar.",
    userId: 1
  },
  {
    id: 3,
    title: "Data Management",
    body: "Manage your data efficiently with our comprehensive data management tools and features.",
    userId: 2
  }
];


export const fetchPosts = () => async (dispatch) => {
  dispatch(fetchPostsStart());
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    dispatch(fetchPostsSuccess(data));
  } catch (error) {
    console.error('Fetch posts error:', error);
    console.log('Using fallback data...');
    // Use fallback data instead of showing error
    dispatch(fetchPostsSuccess(fallbackPosts));
  }
};

export const addPost = (postData) => async (dispatch, getState) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    const data = await response.json();

    const currentState = getState();
    const currentPosts = currentState.data.posts;
    const maxId = currentPosts.length > 0 ? Math.max(...currentPosts.map(post => post.id)) : 0;
    const newPost = { ...data, id: maxId + 1 };

    dispatch(addPostSuccess(newPost));
    return newPost;
  } catch (error) {
    throw new Error('فشل في إضافة البوست');
  }
};

export const updatePost = (id, postData) => async (dispatch) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    const data = await response.json();
    dispatch(updatePostSuccess({ ...data, id }));
    return data;
  } catch (error) {
    throw new Error('فشل في تعديل البوست');
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    });
    dispatch(deletePostSuccess(id));
  } catch (error) {
    throw new Error('فشل في حذف البوست');
  }
};

export default dataSlice.reducer;