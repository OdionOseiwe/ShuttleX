import SideBar from '../../layout/SideBar';
import { Clock, History } from 'lucide-react';

function HistoryPage() {
  return (
    <div className="py-5 z-1">
        <SideBar/>
        <div className="p-10 max-w-4xl mx-auto text-gray-800">
            <h1 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <History />  Activity History
            </h1>


            {/* <div className="space-y-6"> */}
            {/* {history.map((item) => ( */}
            <div  className="shadow-sm rounded-2xl p-4 cursor-pointer bg-gray-100 hover:bg-gray-200">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-xl font-semibold">Booked a ride</p>
                        <p className="text-gray-600 text-sm">To school gate</p>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                        <Clock className="mr-2" />
                        {/* {new Date(item.timestamp).toLocaleString()} */}
                    </div>
                </div>
            </div>
            {/* ))} */}
            {/* </div> */}


            {/* {history.length === 0 && (
            <p className="text-center text-gray-500 mt-10 text-lg">No activity yet.</p>
            )} */}
        </div>
    </div>
  )
}

export default HistoryPage
