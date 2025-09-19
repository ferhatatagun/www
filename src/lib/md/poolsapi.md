# \PoolsApi

All URIs are relative to *https://localhost/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**AddOsdsToPool**](PoolsApi.md#AddOsdsToPool) | **Put** /pools/{pool_id}/osds |
[**CreatePool**](PoolsApi.md#CreatePool) | **Post** /pools/ |
[**DeletePool**](PoolsApi.md#DeletePool) | **Delete** /pools/{pool_id} |
[**DisableDeviceTypeCheck**](PoolsApi.md#DisableDeviceTypeCheck) | **Post** /pools/{pool_id}:disable-device-type-check |
[**EnableDeviceTypeCheck**](PoolsApi.md#EnableDeviceTypeCheck) | **Post** /pools/{pool_id}:enable-device-type-check |
[**GetPool**](PoolsApi.md#GetPool) | **Get** /pools/{pool_id} |
[**GetPoolPredictions**](PoolsApi.md#GetPoolPredictions) | **Get** /pools/{pool_id}/predictions |
[**GetPoolSamples**](PoolsApi.md#GetPoolSamples) | **Get** /pools/{pool_id}/samples |
[**GetPoolTopology**](PoolsApi.md#GetPoolTopology) | **Get** /pools/{pool_id}/topology |
[**ListPools**](PoolsApi.md#ListPools) | **Get** /pools/ |
[**RemoveOsdsFromPool**](PoolsApi.md#RemoveOsdsFromPool) | **Delete** /pools/{pool_id}/osds |
[**ReweightPool**](PoolsApi.md#ReweightPool) | **Post** /pools/{pool_id}:reweight |
[**SwitchPoolRole**](PoolsApi.md#SwitchPoolRole) | **Post** /pools/{pool_id}:switch-role |
[**UpdatePool**](PoolsApi.md#UpdatePool) | **Patch** /pools/{pool_id} |


# **AddOsdsToPool**
> PoolResp AddOsdsToPool(ctx, poolId, body)


Add osds to pool

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for logging, tracing, authentication, etc.
  **poolId** | **int64**| pool id |
  **body** | [**OsdsAddReq**](OsdsAddReq.md)| osd infos |

### Return type

[**PoolResp**](PoolResp.md)

### Authorization

[tokenInHeader](../README.md#tokenInHeader), [tokenInQuery](../README.md#tokenInQuery)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **CreatePool**
> PoolResp CreatePool(ctx, body)


Create pool

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for logging, tracing, authentication, etc.
  **body** | [**PoolCreateReq**](PoolCreateReq.md)| the pool info |

### Return type

[**PoolResp**](PoolResp.md)

### Authorization

[tokenInHeader](../README.md#tokenInHeader), [tokenInQuery](../README.md#tokenInQuery)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **DeletePool**
> PoolResp DeletePool(ctx, poolId, optional)


Delete pool

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for logging, tracing, authentication, etc.
  **poolId** | **int64**| pool id |
 **optional** | **map[string]interface{}** | optional parameters | nil if no parameters

### Optional Parameters
Optional parameters are passed through a map[string]interface{}.

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **poolId** | **int64**| pool id |
 **force** | **bool**| force delete or not |

### Return type

[**PoolResp**](PoolResp.md)

### Authorization

[tokenInHeader](../README.md#tokenInHeader), [tokenInQuery](../README.md#tokenInQuery)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **DisableDeviceTypeCheck**
> PoolResp DisableDeviceTypeCheck(ctx, poolId)


Disable device type check when add osd

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for logging, tracing, authentication, etc.
  **poolId** | **int64**| pool id |

### Return type

[**PoolResp**](PoolResp.md)

### Authorization

[tokenInHeader](../README.md#tokenInHeader), [tokenInQuery](../README.md#tokenInQuery)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **EnableDeviceTypeCheck**
> PoolResp EnableDeviceTypeCheck(ctx, poolId)


Enable device type check when add osd

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for logging, tracing, authentication, etc.
  **poolId** | **int64**| pool id |

### Return type

[**PoolResp**](PoolResp.md)

### Authorization

[tokenInHeader](../README.md#tokenInHeader), [tokenInQuery](../README.md#tokenInQuery)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **GetPool**
> PoolResp GetPool(ctx, poolId)


get pool

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for logging, tracing, authentication, etc.
  **poolId** | **int64**| pool id |

### Return type

[**PoolResp**](PoolResp.md)

### Authorization

[tokenInHeader](../README.md#tokenInHeader), [tokenInQuery](../README.md#tokenInQuery)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **GetPoolPredictions**
> PoolPredictionsResp GetPoolPredictions(ctx, poolId)


get a pool's prediction

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for logging, tracing, authentication, etc.
  **poolId** | **int64**| pool id |

### Return type

[**PoolPredictionsResp**](PoolPredictionsResp.md)

### Authorization

[tokenInHeader](../README.md#tokenInHeader), [tokenInQuery](../README.md#tokenInQuery)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **GetPoolSamples**
> PoolSamplesResp GetPoolSamples(ctx, poolId, optional)


get pool's samples

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for logging, tracing, authentication, etc.
  **poolId** | **int64**| pool id |
 **optional** | **map[string]interface{}** | optional parameters | nil if no parameters

### Optional Parameters
Optional parameters are passed through a map[string]interface{}.

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **poolId** | **int64**| pool id |
 **durationBegin** | **string**| duration begin timestamp |
 **durationEnd** | **string**| duration end timestamp |
 **period** | **string**| samples period |

### Return type

[**PoolSamplesResp**](PoolSamplesResp.md)

### Authorization

[tokenInHeader](../README.md#tokenInHeader), [tokenInQuery](../README.md#tokenInQuery)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **GetPoolTopology**
> PoolTopologyResp GetPoolTopology(ctx, poolId)


get pool topology

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for logging, tracing, authentication, etc.
  **poolId** | **int64**| pool id |

### Return type

[**PoolTopologyResp**](PoolTopologyResp.md)

### Authorization

[tokenInHeader](../README.md#tokenInHeader), [tokenInQuery](../README.md#tokenInQuery)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **ListPools**
> PoolsResp ListPools(ctx, optional)


List pools

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for logging, tracing, authentication, etc.
 **optional** | **map[string]interface{}** | optional parameters | nil if no parameters

### Optional Parameters
Optional parameters are passed through a map[string]interface{}.

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **limit** | **int64**| paging param |
 **offset** | **int64**| paging param |
 **all** | **bool**| show all pools |
 **protectionDomainId** | **int64**| protection domain id |
 **compoundOsdOnly** | **bool**| filter pool with only compound osds |
 **osdGroupId** | **int64**| osd group id |
 **poolType** | **string**| filter pool by type |
 **poolRole** | **string**| filter pool by role |
 **poolMode** | **string**| filter pool by pool_mode |
 **stretched** | **bool**| filter stretched pool |
 **withCompound** | **bool**| with compound pool |
 **osPolicyId** | **int64**| filter data pool by object storage policy id |
 **storageClassId** | **int64**| filter data pool by os storage class id |
 **storageClassPoolType** | **string**| storage class pool type(active inactive) to query |
 **q** | **string**| query param of search |
 **sort** | **string**| sort param of search |

### Return type

[**PoolsResp**](PoolsResp.md)

### Authorization

[tokenInHeader](../README.md#tokenInHeader), [tokenInQuery](../README.md#tokenInQuery)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **RemoveOsdsFromPool**
> PoolResp RemoveOsdsFromPool(ctx, poolId, body)


Remove multiple osds from a pool

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for logging, tracing, authentication, etc.
  **poolId** | **int64**| pool id |
  **body** | [**OsdsRemoveReq**](OsdsRemoveReq.md)| osd infos |

### Return type

[**PoolResp**](PoolResp.md)

### Authorization

[tokenInHeader](../README.md#tokenInHeader), [tokenInQuery](../README.md#tokenInQuery)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **ReweightPool**
> PoolResp ReweightPool(ctx, poolId)


Reweight a pool

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for logging, tracing, authentication, etc.
  **poolId** | **int64**| pool id |

### Return type

[**PoolResp**](PoolResp.md)

### Authorization

[tokenInHeader](../README.md#tokenInHeader), [tokenInQuery](../README.md#tokenInQuery)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **SwitchPoolRole**
> PoolResp SwitchPoolRole(ctx, poolId)


Switch pool role to compound

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for logging, tracing, authentication, etc.
  **poolId** | **int64**| pool id |

### Return type

[**PoolResp**](PoolResp.md)

### Authorization

[tokenInHeader](../README.md#tokenInHeader), [tokenInQuery](../README.md#tokenInQuery)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **UpdatePool**
> PoolResp UpdatePool(ctx, poolId, body)


update pool info

### Required Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ctx** | **context.Context** | context for logging, tracing, authentication, etc.
  **poolId** | **int64**| pool id |
  **body** | [**PoolUpdateReq**](PoolUpdateReq.md)| pool info |

### Return type

[**PoolResp**](PoolResp.md)

### Authorization

[tokenInHeader](../README.md#tokenInHeader), [tokenInQuery](../README.md#tokenInQuery)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
