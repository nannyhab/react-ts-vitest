import butterfly from './assets/butterfly.svg'
import Banner from './components/Banner';
import TermPage from './components/TermPage';
import { useJsonQuery } from './utilities/fetch';

interface schedule {
  title: string;
  courses: Record<string, {
    term: string;
    number: string;
    meets: string;
    title: string;
  }>;
}

const App = () => {
  const [json, loading, error] = useJsonQuery("https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php")
  
  if (error) {
    return <div>Error loading data: {error.message}</div>
  }
  if (loading) {
    return <div>Loading Data...</div>
  }
  if (!json) {
    return <div>No data found.</div>
  }
  
  const schedule = json as schedule;
  const today = new Date();
  const day = today.toLocaleString([], {weekday: 'long'});
  const date = today.toLocaleDateString([], {dateStyle: 'long'})
  
  return (
    <div className="text-center">
      <Banner title={schedule.title} />
      <header className="bg-[#282c34] min-h-screen flex flex-col items-center justify-center text-[calc(10px_+_2vmin)] text-white">
       <img src={butterfly} className="h-[20vmin] pointer-events-none motion-safe:animate-logo-spin" alt="logo" />
        <p className="m-4">CS Course Scheduler</p>
        <p>This page was last loaded on {day}, {date}.</p>

        <TermPage courses={schedule.courses} />
    
    </header>
    </div>
  )
}

export default App
