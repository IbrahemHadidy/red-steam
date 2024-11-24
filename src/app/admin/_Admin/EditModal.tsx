// Redux Hooks
import { useAppDispatch, useAppSelector } from '@store/hooks';

// Redux Handlers
import {
  setDiscount,
  setDiscountEndDate,
  setDiscountPrice,
  setDiscountStartDate,
  setIcon,
  setIsEditModalOpen,
  setName,
  setOfferType,
  setWebsite,
} from '@store/features/admin/adminSlice';

// Redux Thunks
import { updateItem } from '@store/features/admin/adminThunks';

// Utils
import formatDate from '@utils/formatDate';
import getBase64FromFile from '@utils/getBase64FromFile';
import { isPricing } from '@utils/typeGuards';
import Decimal from 'decimal.js';

// Types
import type { ChangeEvent } from 'react';

export default function EditModal() {
  //--------------------------- Initializations ---------------------------//
  const dispatch = useAppDispatch();

  //--------------------------- State Selectors ---------------------------//
  const {
    adminType,
    currentEditItem,
    name,
    website,
    discount,
    discountPrice,
    offerType,
    discountStartDate,
    discountEndDate,
    isFetching,
  } = useAppSelector((state) => state.admin.common);

  //---------------------------- Event Handlers ---------------------------//
  const handleSubmit = async (): Promise<void> => {
    await dispatch(updateItem());
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setName(e.target.value));
  };

  const handleWebsiteChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setWebsite(e.target.value));
  };

  const handleDiscountChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setDiscount(e.target.checked));
  };

  const handleDiscountPriceChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setDiscountPrice(new Decimal(e.target.value).toString()));
  };

  const handleOfferTypeChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (value === 'SPECIAL PROMOTION' || value === 'WEEKEND DEAL') {
      dispatch(setOfferType(value));
    } else {
      console.error('Invalid offer type value');
    }
  };

  const handleDiscountStartDateChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setDiscountStartDate(new Date(e.target.value).toString()));
  };

  const handleDiscountEndDateChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setDiscountEndDate(new Date(e.target.value).toString()));
  };

  const handleIconChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = e.target.files?.[0];
    if (!file) return;
    const base64String = await getBase64FromFile(file);
    dispatch(setIcon(base64String));
  };

  const closeModal = (): void => {
    dispatch(setIsEditModalOpen(false));
  };

  //------------------------------- Render --------------------------------//
  return (
    <>
      <div className="modal-overlay" onClick={closeModal} />
      <div className="edit-modal">
        <form onSubmit={handleSubmit}>
          {adminType === 'offer' ? (
            <>
              <div className="form-group checkbox">
                <label htmlFor="discount">Discount</label>
                <input
                  id="discount"
                  name="discount"
                  type="text"
                  checked={
                    currentEditItem && isPricing(currentEditItem) ? currentEditItem.discount : false
                  }
                  onChange={handleDiscountChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="discountPrice">Discount Price</label>
                <input
                  id="discountPrice"
                  name="discountPrice"
                  type="number"
                  value={discountPrice.toString()}
                  onChange={handleDiscountPriceChange}
                  disabled={!discount}
                />
              </div>

              <div className="form-group radio">
                <label className="form-label" htmlFor="offerTypeSpecial">
                  <input
                    id="offerTypeSpecial"
                    name="offerType"
                    className="form-input"
                    type="radio"
                    checked={offerType === 'SPECIAL PROMOTION'}
                    onChange={handleOfferTypeChange}
                  />
                  SPECIAL PROMOTION
                </label>
                <label className="form-label" htmlFor="offerTypeWeekend">
                  <input
                    id="offerTypeWeekend"
                    name="offerType"
                    className="form-input"
                    type="radio"
                    checked={offerType === 'WEEKEND DEAL'}
                    onChange={handleOfferTypeChange}
                  />
                  WEEKEND DEAL
                </label>
              </div>

              <div className="form-group">
                <label htmlFor="discountStartDate">Discount Start Date</label>
                <input
                  id="discountStartDate"
                  name="discountStartDate"
                  type="date"
                  value={formatDate(discountStartDate)}
                  onChange={handleDiscountStartDateChange}
                  disabled={!discount}
                />
              </div>

              <div className="form-group">
                <label htmlFor="discountEndDate">Discount End Date</label>
                <input
                  id="discountEndDate"
                  name="discountEndDate"
                  type="date"
                  value={formatDate(discountEndDate)}
                  onChange={handleDiscountEndDateChange}
                  disabled={!discount}
                />
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  required
                />
              </div>

              {(adminType === 'developer' || adminType === 'publisher') && (
                <div className="form-group">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="url"
                    value={website}
                    onChange={handleWebsiteChange}
                  />
                </div>
              )}

              {adminType === 'feature' && (
                <div className="form-group">
                  <label htmlFor="icon">Icon</label>
                  <input id="icon" name="icon" type="file" onChange={handleIconChange} />
                </div>
              )}
            </>
          )}

          <button type="submit" disabled={isFetching}>
            Save
          </button>
        </form>
      </div>
    </>
  );
}
