import EditEpigramForm from '@/components/addEditForm/EditEpigramForm';

export default function EpigramEdit({ params }: { params: { id: string } }) {
  const { id } = params;
  return <EditEpigramForm id={Number(id)} />;
}
