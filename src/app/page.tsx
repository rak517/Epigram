'use client';

import { useGetUser } from '@/apis/user/queries';

export default function Home() {
  const { data } = useGetUser();
  return <div>landing Page {JSON.stringify(data)}</div>;
}
