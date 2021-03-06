import featureStoreApi from '../api/featureStore-api'
import {
  CREATE_NEW_FEATURE_SET_BEGIN,
  CREATE_NEW_FEATURE_SET_FAILURE,
  CREATE_NEW_FEATURE_SET_SUCCESS,
  FETCH_FEATURES_BEGIN,
  FETCH_FEATURES_FAILURE,
  FETCH_FEATURES_SUCCESS,
  FETCH_FEATURE_SETS_BEGIN,
  FETCH_FEATURE_SETS_FAILURE,
  FETCH_FEATURE_SETS_SUCCESS,
  FETCH_FEATURE_SUCCESS,
  FETCH_FEATURE_VECTORS_BEGIN,
  FETCH_FEATURE_VECTORS_FAILURE,
  FETCH_FEATURE_VECTORS_SUCCESS,
  FETCH_FEATURE_VECTOR_SUCCESS,
  REMOVE_FEATURE,
  REMOVE_FEATURES,
  REMOVE_FEATURES_ERROR,
  REMOVE_FEATURE_SETS,
  REMOVE_FEATURE_VECTOR,
  REMOVE_FEATURE_VECTORS,
  REMOVE_NEW_FEATURE_SET,
  SET_NEW_FEATURE_SET_DATA_SOURCE_ATTRIBUTES,
  SET_NEW_FEATURE_SET_DATA_SOURCE_ENTITIES,
  SET_NEW_FEATURE_SET_DATA_SOURCE_KEY,
  SET_NEW_FEATURE_SET_DATA_SOURCE_KIND,
  SET_NEW_FEATURE_SET_DATA_SOURCE_TIME,
  SET_NEW_FEATURE_SET_DATA_SOURCE_URL,
  SET_NEW_FEATURE_SET_DESCRIPTION,
  SET_NEW_FEATURE_SET_LABELS,
  SET_NEW_FEATURE_SET_NAME,
  SET_NEW_FEATURE_SET_SCHEDULE,
  SET_NEW_FEATURE_SET_SCHEMA_TIMESTAMP_KEY,
  SET_NEW_FEATURE_SET_TARGET,
  SET_NEW_FEATURE_SET_VERSION,
  START_FEATURE_SET_INGEST_BEGIN,
  START_FEATURE_SET_INGEST_SUCCESS
} from '../constants'
import { parseFeatureVectors } from '../utils/parseFeatureVectors'
import { parseFeatures } from '../utils/parseFeatures'

const featureStoreActions = {
  createNewFeatureSet: (project, data) => dispatch => {
    dispatch(featureStoreActions.createNewFeatureSetBegin())

    return featureStoreApi
      .createFeatureSet(project, data)
      .then(result => {
        dispatch(featureStoreActions.createNewFeatureSetSuccess())

        return result
      })
      .catch(error => {
        dispatch(featureStoreActions.createNewFeatureSetFailure(error.message))

        throw error
      })
  },
  createNewFeatureSetBegin: () => ({
    type: CREATE_NEW_FEATURE_SET_BEGIN
  }),
  createNewFeatureSetFailure: error => ({
    type: CREATE_NEW_FEATURE_SET_FAILURE,
    payload: error
  }),
  createNewFeatureSetSuccess: () => ({
    type: CREATE_NEW_FEATURE_SET_SUCCESS
  }),
  createNewFeatureVector: data => () =>
    featureStoreApi.createFeatureVector(data),
  fetchFeatureSets: (project, filters, config) => dispatch => {
    dispatch(featureStoreActions.fetchFeatureSetsBegin())

    return featureStoreApi
      .getFeatureSets(project, filters, config)
      .then(response => {
        dispatch(
          featureStoreActions.fetchFeatureSetsSuccess(
            response.data?.feature_sets
          )
        )

        return response.data?.feature_sets
      })
      .catch(err => {
        dispatch(featureStoreActions.fetchFeatureSetsFailure(err))
      })
  },
  fetchFeatureSetsBegin: () => ({
    type: FETCH_FEATURE_SETS_BEGIN
  }),
  fetchFeatureSetsFailure: error => ({
    type: FETCH_FEATURE_SETS_FAILURE,
    payload: error
  }),
  fetchFeatureSetsSuccess: featureSets => ({
    type: FETCH_FEATURE_SETS_SUCCESS,
    payload: featureSets
  }),
  fetchFeatureVector: (project, featureVector) => dispatch => {
    return featureStoreApi
      .getFeatureVector(project, featureVector)
      .then(response => {
        dispatch(
          featureStoreActions.fetchFeatureVectorSuccess({
            [featureVector]: parseFeatureVectors(response.data?.feature_vectors)
          })
        )

        return response.data?.feature_vectors
      })
      .catch(error => {
        throw error
      })
  },
  fetchFeatureVectorSuccess: featureSets => ({
    type: FETCH_FEATURE_VECTOR_SUCCESS,
    payload: featureSets
  }),
  fetchFeatureVectors: (project, filters, config) => dispatch => {
    dispatch(featureStoreActions.fetchFeatureVectorsBegin())

    return featureStoreApi
      .getFeatureVectors(project, filters, config)
      .then(response => {
        dispatch(
          featureStoreActions.fetchFeatureVectorsSuccess(
            parseFeatureVectors(response.data.feature_vectors)
          )
        )

        return response.data.feature_vectors
      })
      .catch(err => {
        dispatch(featureStoreActions.fetchFeatureVectorsFailure(err))
      })
  },
  fetchFeatureVectorsBegin: () => ({
    type: FETCH_FEATURE_VECTORS_BEGIN
  }),
  fetchFeatureVectorsFailure: error => ({
    type: FETCH_FEATURE_VECTORS_FAILURE,
    payload: error
  }),
  fetchFeatureVectorsSuccess: featureSets => ({
    type: FETCH_FEATURE_VECTORS_SUCCESS,
    payload: featureSets
  }),
  fetchFeature: (project, featureName, featureMetadataName) => dispatch => {
    return featureStoreApi
      .getFeature(project, featureName)
      .then(response => {
        const filteredFeatures = response.data.features.filter(
          responseItem =>
            responseItem.feature_set_digest.metadata.name ===
            featureMetadataName
        )

        dispatch(
          featureStoreActions.fetchFeatureSuccess({
            [`${featureName}-${featureMetadataName}`]: parseFeatures(
              filteredFeatures
            )
          })
        )

        return filteredFeatures
      })
      .catch(error => {
        throw error
      })
  },
  fetchFeatureSuccess: features => ({
    type: FETCH_FEATURE_SUCCESS,
    payload: features
  }),
  fetchFeatures: (project, filters) => dispatch => {
    dispatch(featureStoreActions.fetchFeaturesBegin())

    return featureStoreApi
      .getFeatures(project, filters)
      .then(response => {
        dispatch(
          featureStoreActions.fetchFeaturesSuccess(response.data.features)
        )

        return response.data.features
      })
      .catch(err => {
        dispatch(featureStoreActions.fetchFeaturesFailure(err))
      })
  },
  fetchFeaturesBegin: () => ({
    type: FETCH_FEATURES_BEGIN
  }),
  fetchFeaturesFailure: error => ({
    type: FETCH_FEATURES_FAILURE,
    payload: error
  }),
  fetchFeaturesSuccess: features => ({
    type: FETCH_FEATURES_SUCCESS,
    payload: features
  }),
  removeFeatureSets: () => ({
    type: REMOVE_FEATURE_SETS
  }),
  removeFeatureVector: featureVectors => ({
    type: REMOVE_FEATURE_VECTOR,
    payload: featureVectors
  }),
  removeFeatureVectors: () => ({
    type: REMOVE_FEATURE_VECTORS
  }),
  removeFeature: features => ({
    type: REMOVE_FEATURE,
    payload: features
  }),
  removeFeatures: () => ({
    type: REMOVE_FEATURES
  }),
  removeFeatureStoreError: () => ({
    type: REMOVE_FEATURES_ERROR
  }),
  removeNewFeatureSet: () => ({
    type: REMOVE_NEW_FEATURE_SET
  }),
  setNewFeatureSetDataSourceAttributes: attributes => ({
    type: SET_NEW_FEATURE_SET_DATA_SOURCE_ATTRIBUTES,
    payload: attributes
  }),
  setNewFeatureSetDataSourceEntities: entities => ({
    type: SET_NEW_FEATURE_SET_DATA_SOURCE_ENTITIES,
    payload: entities
  }),
  setNewFeatureSetDataSourceKey: key => ({
    type: SET_NEW_FEATURE_SET_DATA_SOURCE_KEY,
    payload: key
  }),
  setNewFeatureSetDataSourceKind: kind => ({
    type: SET_NEW_FEATURE_SET_DATA_SOURCE_KIND,
    payload: kind
  }),
  setNewFeatureSetDataSourceTime: time => ({
    type: SET_NEW_FEATURE_SET_DATA_SOURCE_TIME,
    payload: time
  }),
  setNewFeatureSetDataSourceUrl: url => ({
    type: SET_NEW_FEATURE_SET_DATA_SOURCE_URL,
    payload: url
  }),
  setNewFeatureSetDescription: description => ({
    type: SET_NEW_FEATURE_SET_DESCRIPTION,
    payload: description
  }),
  setNewFeatureSetLabels: labels => ({
    type: SET_NEW_FEATURE_SET_LABELS,
    payload: labels
  }),
  setNewFeatureSetName: name => ({
    type: SET_NEW_FEATURE_SET_NAME,
    payload: name
  }),
  setNewFeatureSetSchedule: schedule => ({
    type: SET_NEW_FEATURE_SET_SCHEDULE,
    payload: schedule
  }),
  setNewFeatureSetSchemaTimestampKey: timestamp_key => ({
    type: SET_NEW_FEATURE_SET_SCHEMA_TIMESTAMP_KEY,
    payload: timestamp_key
  }),
  setNewFeatureSetTarget: target => ({
    type: SET_NEW_FEATURE_SET_TARGET,
    payload: target
  }),
  setNewFeatureSetVersion: version => ({
    type: SET_NEW_FEATURE_SET_VERSION,
    payload: version
  }),
  startFeatureSetIngest: (
    project,
    featureSet,
    reference,
    source,
    targets
  ) => dispatch => {
    dispatch(featureStoreActions.startFeatureSetIngestBegin())

    return featureStoreApi
      .startIngest(project, featureSet, reference, source, targets)
      .then(result => {
        dispatch(featureStoreActions.startFeatureSetIngestSuccess())

        return result
      })
      .catch(error => {
        dispatch(featureStoreActions.createNewFeatureSetFailure(error.message))

        throw error
      })
  },
  startFeatureSetIngestBegin: () => ({
    type: START_FEATURE_SET_INGEST_BEGIN
  }),
  startFeatureSetIngestSuccess: () => ({
    type: START_FEATURE_SET_INGEST_SUCCESS
  }),
  updateFeatureStoreData: (
    projectName,
    featureData,
    tag,
    data,
    pageTab
  ) => () => {
    return featureStoreApi.updateFeatureStoreData(
      projectName,
      featureData,
      tag,
      data,
      pageTab
    )
  },
  updateFeatureVectorData: data => () => {
    return featureStoreApi.updateFeatureVectorData(data)
  }
}

export default featureStoreActions
