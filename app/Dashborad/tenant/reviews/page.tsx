'use client';

export default function ReviewsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Property Reviews</h1>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4 max-w-xl">
        <h2 className="font-bold text-slate-800 text-base">Leave a New Property Review</h2>
        <form onSubmit={(e) => { e.preventDefault(); alert('Review submitted!'); }} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-600">Rating</label>
            <select className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm bg-white">
              <option value="5">⭐⭐⭐⭐⭐ (5 - Excellent)</option>
              <option value="4">⭐⭐⭐⭐ (4 - Good)</option>
              <option value="3">⭐⭐⭐ (3 - Average)</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-600">Feedback</label>
            <textarea rows={3} placeholder="Share your experience..." className="mt-1 w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm" />
          </div>
          <button type="submit" className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white">Submit Review</button>
        </form>
      </div>
    </div>
  );
}