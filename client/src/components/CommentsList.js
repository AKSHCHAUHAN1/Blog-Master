import React from "react";

const CommentsList = ({ comments }) => {
  // Defensive check: ensure comments is an array before calling .map()
  const safeComments = comments || [];

  return (
    <>
      <h3 className='sm:text-2xl text-xl font-bold my-6 text-slate-900'>
        Comments ({safeComments.length})
      </h3>
      {safeComments.length > 0 ? (
        safeComments.map((comment, index) => (
          <div key={index} className="mb-6 border-l-4 border-green-500 pl-4 py-1 bg-slate-50/50 rounded-r-lg">
            <h4 className='text-lg font-bold text-slate-800'>{comment.username}</h4>
            <p className='text-slate-600 mt-1'>{comment.text}</p>
          </div>
        ))
      ) : (
        <p className="text-slate-400 italic py-4">No comments found for this insight.</p>
      )}
    </>
  );
};

export default CommentsList;