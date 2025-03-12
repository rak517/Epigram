export interface AlramMessage {
  title?: string;
  description?: string;
  cancelMessage?: string;
  okMessage?: string;
  onClose: () => void;
}
