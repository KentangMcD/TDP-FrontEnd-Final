import { useEffect, useState } from 'react';
import image1 from '../public/bg-header-desktop.svg'

import JobList from './component/JobList';
import data from './data/data.json';


const App = () => {

  // State untuk melacak kategori yang telah ditambahkan
  const [addedCategories, setAddedCategories] = useState([]);
  const [filteredJob, setFilteredJob] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  // State untuk melacak apakah kolom kategori harus ditampilkan atau disembunyikan
  const [showCategories, setShowCategories] = useState(false);

  // Fungsi untuk menambahkan kategori pada kolom
  const addCategory = (category) => {
    if (!addedCategories.includes(category)) {
      // Jika kategori belum ditambahkan, tambahkan ke daftar
      setAddedCategories([...addedCategories, category]);
      // Tampilkan kolom kategori
      setShowCategories(true);
    }
  };

  const removeCategory = (category) => {
    const updatedCategories = addedCategories.filter((c) => c !== category);
    setAddedCategories(updatedCategories);
  }

  const clearCategories = () => {
    setAddedCategories([]);
    setShowCategories(false);
  };

  useEffect(() => {
  console.log(addedCategories);
  if (addedCategories.length === 0 ) {
    setFilteredJob(data)
    return;
  }
  let filteredData = data.filter((job) => 
   addedCategories.every (
    (filter) => 
      job.role === filter ||
      job.level === filter ||
      job.languages.includes(filter)
   ));
   
  setFilteredJob(filteredData) 
   },[addedCategories]);

  const changePage = (pageNumber) => {
    if (pageNumber !== currentPage){
      setCurrentPage(pageNumber);
    }
  }
   
 

  return (
    <>
      <header className="bg-cyan-dark bg-no-repeat bg-cover h-44 bg-header-desktop" style={{backgroundImage: `url(${image1})`}}></header>
      <main className="bg-cyan-light min-h-[80vh] pb-8 px-6">
        <div className="max-w-5xl m-auto relative -top-8 ">
          <div className="w-full max-w-5xl min-h-[4rem] mb-10">
            {addedCategories.length > 0 &&
              <div className="bg-white rounded-md px-7 py-4 w-full shadow-lg flex justify-between">
              <ul className="flex flex-wrap gap-4">
                {addedCategories.map((category, index) => (
                  <li className="flex" key = {index}>
                    <label style={{alignSelf: 'center'}} className="bg-cyan-light-2 px-2 py-1.5 text-sm text-cyan-dark font-bold rounded-l-md    cursor-default">
                      {category} 
                    </label>
                      <div>
                  
                    <button className="bg-cyan-dark h-full flex items-center p-2 rounded-r-md hover:bg-cyan-very-dark"  onClick={() => removeCategory(category)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"><path fill="#FFF" fillRule="evenodd" d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"></path></svg>
                    </button>            
                    </div>
                  </li>
                ))}
              </ul>
                <button className="text-sm text-cyan-dark font-bold underline" onClick={clearCategories} >
                Clear
              </button>
            </div>
          
            }
          
          </div>
          <div>
            <ul >
              {filteredJob.slice((currentPage - 1 ) *5, currentPage * 5).map((job) => (
                <JobList key={job.id} job={job} onClick={addCategory} />
              ))}
            </ul>
          </div>
          <nav className="mt-4">
            <ul className="flex justify-center">
              {[...Array(Math.ceil(filteredJob.length / jobsPerPage)).keys(),
             
              ].map((num) => ( <li key={num}>
                <button className={`mx-1 px-6 py-4 rounded shadow ${currentPage === num+1 ? "text-white bg-cyan-dark font-bold" : "text-blue-500 bg-white"}`} onClick={() => changePage (num+1)}>
                  {num + 1}
                </button>
              </li>
              ))}
              
                  
            </ul>
          </nav>
        </div>
      </main>
    </>
  );
};

export default App;
