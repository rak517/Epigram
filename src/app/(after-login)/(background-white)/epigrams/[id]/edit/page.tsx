import EditEpigramForm from '@/components/addEditForm/EditEpigramForm';

export default async function EpigramEdit({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <EditEpigramForm id={Number(id)} />;
}
