import { useEffect, useMemo, useRef } from 'react'
import PhotoPlaceholder from './PhotoPlaceholder'

export default function PhotoUploadField({ value, onChange }) {
  const inputRef = useRef(null)

  const previewUrl = useMemo(() => (value ? URL.createObjectURL(value) : null), [value])

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    onChange(file)
  }

  const handleRemove = () => {
    onChange(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="field">
      <label className="field-label">사진 (선택, 최대 1장)</label>
      {previewUrl ? (
        <div className="photo-preview">
          <img src={previewUrl} alt="첨부한 사진 미리보기" />
          <button
            type="button"
            className="photo-remove-btn"
            aria-label="사진 삭제"
            onClick={handleRemove}
          >
            ×
          </button>
        </div>
      ) : (
        <label className="photo-upload-box">
          <PhotoPlaceholder size={28} />
          <span>사진을 선택하거나 끌어다 놓으세요</span>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="visually-hidden"
          />
        </label>
      )}
    </div>
  )
}
