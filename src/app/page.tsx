'use client'

import { Button } from "@/components/ui/button";
import axios from 'axios';

const handleAll = async () => {
  try {
    const response = await axios.get('/api/lists');
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export default function Home() {
  return (
    <>
      <div className="flex bg-slate-900 items-center justify-center min-h-[100vh]">
      </div>
    </>
  );
}
