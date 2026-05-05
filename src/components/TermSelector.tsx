const TERMS = ["Fall", "Winter", "Spring"] as const;
export type Term = typeof TERMS[number];


const TermSelector = ({ selected, setSelected }: { selected: Term; setSelected: (term: Term) => void }) => {
 return (
   <div className="flex gap-2 mt-4">
     {TERMS.map((term) => (
       <button
         key={term}
         onClick={() => setSelected(term)}
         className={`px-4 py-2 rounded font-semibold transition-colors ${
           selected === term
             ? "bg-white text-[#282c34]"
             : "bg-transparent border border-white text-white hover:bg-white hover:text-[#282c34]"
         }`}
       >
         {term}
       </button>
     ))}
   </div>
 );
};


export default TermSelector;