import React from "react";

const CommentForm = ({ btnLabel, formSubmitHandler, loading }) => {
  return (
    <form>
      <div className="flex flex-col items-end">
        <textarea
          className="w-full focus:outline-none rounded-lg bg-transparent border border-primary p-4"
          rows="5"
          placeholder="Leave your comment here..."
          //   value={value}
          //   onChange={(e) => setValue(e.target.value)}
        />
        <div className="flex flex-col-reverse gap-y-2 items-center gap-x-2 pt-2 min-[420px]:flex-row">
          {/* {formCancelHandler && ( */}
          <button
            //   onClick={formCancelHandler}
            className="px-6 py-2.5 rounded-lg border border-red-500 text-red-500"
          >
            Cancel
          </button>
          {/* )} */}
          <button
            // disabled={loading}
            type="submit"
            className="px-6 py-2.5 rounded-lg border-primary bg-primary
         text-white font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {btnLabel}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
