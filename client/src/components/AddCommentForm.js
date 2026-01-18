import React, { useState } from "react";

const AddCommentForm = ({ articleName, setArticleInfo }) => {
  const [username, setUsername] = useState("");
  const [commentText, setCommentText] = useState("");
  const addComments = async () => {
    const result = await fetch(`/api/articles/${articleName}/add-comments`, {
      method: "post",
      body: JSON.stringify({ username, text: commentText }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const body = await result.json();
    setArticleInfo(body);
    setUsername("");
    setCommentText("");
  };
  return (
    <form className='shadow rounded px-8 pt-6 pb-8 mb-4'>
      <h3 className='text-xl font-bold mb-4 text-gray-900'>Add a comment</h3>
      <label className='block text-gray-700 text-sm font-bold mb-2'>
        Name :
      </label>
      <input
        type='text'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
      />
      <label className='block text-gray-700 text-sm font-bold mb-2'>
        Comment :
      </label>
      <textarea
        rows='4'
        cols='50'
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
      />
      <button
        onClick={() => addComments()}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rouded focus:outline-none focus:shadow-outline'
      >
        Add Comment
      </button>
    </form>
  );
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
      <h3 className="text-lg font-bold text-slate-900 mb-6">Join the conversation</h3>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all"
        />
        <textarea
          rows="4"
          placeholder="What are your thoughts?"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all"
        />
        <button
          onClick={() => addComments()}
          className="w-full bg-slate-900 hover:bg-green-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-green-500/20 active:scale-95"
        >
          Post Comment
        </button>
      </div>
    </div>
  );
};
export default AddCommentForm;