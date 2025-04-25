import { createSlice } from "@reduxjs/toolkit";
import { NameSpace } from "../const";
import { deleteTrainingAction, fetchMyTrainingsAction, fetchTrainingsAction, getFilterValuesAction, getTrainingAction, patchTrainingAction, postTrainingAction } from "./thunks";
import { TrainingsWithPagination } from "../../types/training/trainings-with-pagination";
import { TrainingWithUser } from "../../types/training/training";
import { AllowedFilterValues } from "../../types/filter/allowed-filter-values";

export type InitialState = {
  trainings: TrainingsWithPagination;
  trainingInfo: TrainingWithUser | undefined;
  isTrainingsDataLoading: boolean;
  hasError: boolean;
  filterValues: AllowedFilterValues;
  isProcess: boolean;
  isSuccess: boolean;
};

const initialState: InitialState = {
  trainings: {
    currentPage: 1,
    entities: [],
    itemsPerPage: 7,
    totalItems: 0,
    totalPages: 0
  },
  trainingInfo: undefined,
  isTrainingsDataLoading: false,
  hasError: false,
  filterValues: {
    price: { min: undefined, max: undefined }, 
    calories: { min: undefined, max: undefined },
  },
  isProcess: false,
  isSuccess: false,
};

export const training = createSlice({
  name: NameSpace.Training,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTrainingsAction.pending, (state) => {
        state.isTrainingsDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchTrainingsAction.fulfilled, (state, action) => {
        state.trainings = action.payload;
        state.isTrainingsDataLoading = false;
      })
      .addCase(fetchTrainingsAction.rejected, (state) => {
        state.isTrainingsDataLoading = false;
        state.hasError = true;
      })
      .addCase(fetchMyTrainingsAction.pending, (state) => {
        state.isTrainingsDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchMyTrainingsAction.fulfilled, (state, action) => {
        state.trainings = action.payload;
        state.isTrainingsDataLoading = false;
      })
      .addCase(fetchMyTrainingsAction.rejected, (state) => {
        state.isTrainingsDataLoading = false;
        state.hasError = true;
      })
      .addCase(getTrainingAction.pending, (state) => {
        state.isTrainingsDataLoading = true;
        state.hasError = false;
      })
      .addCase(getTrainingAction.fulfilled, (state, action) => {
        state.trainingInfo = action.payload;
        state.isTrainingsDataLoading = false;
      })
      .addCase(getTrainingAction.rejected, (state) => {
        state.isTrainingsDataLoading = false;
        state.hasError = true;
      })
      .addCase(deleteTrainingAction.pending, (state) => {
        state.isTrainingsDataLoading = true;
        state.hasError = false;
      })
      .addCase(deleteTrainingAction.fulfilled, (state, action) => {
        state.trainings.entities = state.trainings.entities.filter((product) => product.id !== action.payload);
        state.isTrainingsDataLoading = false;
      })
      .addCase(deleteTrainingAction.rejected, (state) => {
        state.isTrainingsDataLoading = false;
        state.hasError = true;
      })
      .addCase(postTrainingAction.pending, (state) => {
        state.isProcess = true;
        state.isSuccess = false;
      })
      .addCase(postTrainingAction.fulfilled, (state, action) => {
        state.trainings.entities.push(action.payload);
        state.isProcess = false;
        state.isSuccess = true;
      })
      .addCase(postTrainingAction.rejected, (state) => {
        state.isProcess = false;
        state.isSuccess = false;
      })
      .addCase(patchTrainingAction.pending, (state) => {
        state.isProcess = true;
        state.isSuccess = false;
      })
      .addCase(patchTrainingAction.fulfilled, (state, action) => {
        state.isProcess = false;
        state.isSuccess = true;
      })
      .addCase(patchTrainingAction.rejected, (state) => {
        state.isProcess = false;
        state.isSuccess = false;
      })
      .addCase(getFilterValuesAction.fulfilled, (state, action) => {
        state.filterValues = action.payload;
      })
  },
})