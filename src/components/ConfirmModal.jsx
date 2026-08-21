export default function ConfirmModal({ message, confirmLabel = '계속', cancelLabel = '취소', onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <button type="button" className="btn-outline" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button type="button" className="cta-btn" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
