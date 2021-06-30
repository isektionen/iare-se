export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `Long` scalar type represents 52-bit integers */
  Long: any;
  /** A time string with format: HH:mm:ss.SSS */
  Time: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AdminUser = {
  __typename?: 'AdminUser';
  id: Scalars['ID'];
  username?: Maybe<Scalars['String']>;
  firstname: Scalars['String'];
  lastname: Scalars['String'];
};

export type Allergy = {
  __typename?: 'Allergy';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  name: Scalars['String'];
  count: Scalars['Int'];
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  localizations?: Maybe<Array<Maybe<Allergy>>>;
};


export type AllergyLocalizationsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type AllergyAggregator = {
  __typename?: 'AllergyAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
  sum?: Maybe<AllergyAggregatorSum>;
  avg?: Maybe<AllergyAggregatorAvg>;
  min?: Maybe<AllergyAggregatorMin>;
  max?: Maybe<AllergyAggregatorMax>;
};

export type AllergyAggregatorAvg = {
  __typename?: 'AllergyAggregatorAvg';
  count?: Maybe<Scalars['Float']>;
};

export type AllergyAggregatorMax = {
  __typename?: 'AllergyAggregatorMax';
  count?: Maybe<Scalars['Float']>;
};

export type AllergyAggregatorMin = {
  __typename?: 'AllergyAggregatorMin';
  count?: Maybe<Scalars['Float']>;
};

export type AllergyAggregatorSum = {
  __typename?: 'AllergyAggregatorSum';
  count?: Maybe<Scalars['Float']>;
};

export type AllergyConnection = {
  __typename?: 'AllergyConnection';
  values?: Maybe<Array<Maybe<Allergy>>>;
  groupBy?: Maybe<AllergyGroupBy>;
  aggregate?: Maybe<AllergyAggregator>;
};

export type AllergyConnectionCount = {
  __typename?: 'AllergyConnectionCount';
  key?: Maybe<Scalars['Int']>;
  connection?: Maybe<AllergyConnection>;
};

export type AllergyConnectionCreated_At = {
  __typename?: 'AllergyConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<AllergyConnection>;
};

export type AllergyConnectionId = {
  __typename?: 'AllergyConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<AllergyConnection>;
};

export type AllergyConnectionLocale = {
  __typename?: 'AllergyConnectionLocale';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<AllergyConnection>;
};

export type AllergyConnectionName = {
  __typename?: 'AllergyConnectionName';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<AllergyConnection>;
};

export type AllergyConnectionPublished_At = {
  __typename?: 'AllergyConnectionPublished_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<AllergyConnection>;
};

export type AllergyConnectionUpdated_At = {
  __typename?: 'AllergyConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<AllergyConnection>;
};

export type AllergyGroupBy = {
  __typename?: 'AllergyGroupBy';
  id?: Maybe<Array<Maybe<AllergyConnectionId>>>;
  created_at?: Maybe<Array<Maybe<AllergyConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<AllergyConnectionUpdated_At>>>;
  name?: Maybe<Array<Maybe<AllergyConnectionName>>>;
  count?: Maybe<Array<Maybe<AllergyConnectionCount>>>;
  locale?: Maybe<Array<Maybe<AllergyConnectionLocale>>>;
  published_at?: Maybe<Array<Maybe<AllergyConnectionPublished_At>>>;
};

export type AllergyInput = {
  name: Scalars['String'];
  count?: Maybe<Scalars['Int']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  name?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  posts?: Maybe<Array<Maybe<Post>>>;
  localizations?: Maybe<Array<Maybe<Category>>>;
};


export type CategoryPostsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type CategoryLocalizationsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type CategoryAggregator = {
  __typename?: 'CategoryAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type CategoryConnection = {
  __typename?: 'CategoryConnection';
  values?: Maybe<Array<Maybe<Category>>>;
  groupBy?: Maybe<CategoryGroupBy>;
  aggregate?: Maybe<CategoryAggregator>;
};

export type CategoryConnectionCreated_At = {
  __typename?: 'CategoryConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<CategoryConnection>;
};

export type CategoryConnectionId = {
  __typename?: 'CategoryConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<CategoryConnection>;
};

export type CategoryConnectionLocale = {
  __typename?: 'CategoryConnectionLocale';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<CategoryConnection>;
};

export type CategoryConnectionName = {
  __typename?: 'CategoryConnectionName';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<CategoryConnection>;
};

export type CategoryConnectionPublished_At = {
  __typename?: 'CategoryConnectionPublished_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<CategoryConnection>;
};

export type CategoryConnectionUpdated_At = {
  __typename?: 'CategoryConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<CategoryConnection>;
};

export type CategoryGroupBy = {
  __typename?: 'CategoryGroupBy';
  id?: Maybe<Array<Maybe<CategoryConnectionId>>>;
  created_at?: Maybe<Array<Maybe<CategoryConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<CategoryConnectionUpdated_At>>>;
  name?: Maybe<Array<Maybe<CategoryConnectionName>>>;
  locale?: Maybe<Array<Maybe<CategoryConnectionLocale>>>;
  published_at?: Maybe<Array<Maybe<CategoryConnectionPublished_At>>>;
};

export type CategoryInput = {
  name?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Maybe<Scalars['ID']>>>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type Committee = {
  __typename?: 'Committee';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  name: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  adminUsers?: Maybe<Array<Maybe<AdminUser>>>;
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
  events?: Maybe<Array<Maybe<Event>>>;
  posts?: Maybe<Array<Maybe<Post>>>;
  localizations?: Maybe<Array<Maybe<Committee>>>;
};


export type CommitteeAdminUsersArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type CommitteeUsersArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type CommitteeEventsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type CommitteePostsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type CommitteeLocalizationsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type CommitteeAggregator = {
  __typename?: 'CommitteeAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type CommitteeConnection = {
  __typename?: 'CommitteeConnection';
  values?: Maybe<Array<Maybe<Committee>>>;
  groupBy?: Maybe<CommitteeGroupBy>;
  aggregate?: Maybe<CommitteeAggregator>;
};

export type CommitteeConnectionCreated_At = {
  __typename?: 'CommitteeConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<CommitteeConnection>;
};

export type CommitteeConnectionId = {
  __typename?: 'CommitteeConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<CommitteeConnection>;
};

export type CommitteeConnectionLocale = {
  __typename?: 'CommitteeConnectionLocale';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<CommitteeConnection>;
};

export type CommitteeConnectionName = {
  __typename?: 'CommitteeConnectionName';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<CommitteeConnection>;
};

export type CommitteeConnectionPublished_At = {
  __typename?: 'CommitteeConnectionPublished_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<CommitteeConnection>;
};

export type CommitteeConnectionUpdated_At = {
  __typename?: 'CommitteeConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<CommitteeConnection>;
};

export type CommitteeGroupBy = {
  __typename?: 'CommitteeGroupBy';
  id?: Maybe<Array<Maybe<CommitteeConnectionId>>>;
  created_at?: Maybe<Array<Maybe<CommitteeConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<CommitteeConnectionUpdated_At>>>;
  name?: Maybe<Array<Maybe<CommitteeConnectionName>>>;
  locale?: Maybe<Array<Maybe<CommitteeConnectionLocale>>>;
  published_at?: Maybe<Array<Maybe<CommitteeConnectionPublished_At>>>;
};

export type CommitteeInput = {
  name: Scalars['String'];
  adminUsers?: Maybe<Array<Maybe<Scalars['ID']>>>;
  users?: Maybe<Array<Maybe<Scalars['ID']>>>;
  events?: Maybe<Array<Maybe<Scalars['ID']>>>;
  posts?: Maybe<Array<Maybe<Scalars['ID']>>>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type ComponentEventInternalStreet = {
  __typename?: 'ComponentEventInternalStreet';
  id: Scalars['ID'];
  streetName: Scalars['String'];
  streetPostalCode?: Maybe<Scalars['Int']>;
};

export type ComponentEventInternalStreetInput = {
  streetName: Scalars['String'];
  streetPostalCode?: Maybe<Scalars['Int']>;
};

export type ComponentEventInternalTicket = {
  __typename?: 'ComponentEventInternalTicket';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
};

export type ComponentEventInternalTicketInput = {
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
};

export type ComponentEventPasswordProtect = {
  __typename?: 'ComponentEventPasswordProtect';
  id: Scalars['ID'];
};

export type ComponentEventPasswordProtectInput = {
  password?: Maybe<Scalars['String']>;
};

export type ComponentEventPlace = {
  __typename?: 'ComponentEventPlace';
  id: Scalars['ID'];
  name: Scalars['String'];
  detailedStreetInfo?: Maybe<ComponentEventInternalStreet>;
  showMap: Scalars['Boolean'];
};

export type ComponentEventPlaceInput = {
  name: Scalars['String'];
  detailedStreetInfo?: Maybe<ComponentEventInternalStreetInput>;
  showMap?: Maybe<Scalars['Boolean']>;
};

export type ComponentEventRecipient = {
  __typename?: 'ComponentEventRecipient';
  id: Scalars['ID'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
};

export type ComponentEventRecipientInput = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
};

export type ComponentEventServing = {
  __typename?: 'ComponentEventServing';
  id: Scalars['ID'];
  servingFood: Scalars['Boolean'];
  servingAlcohol: Scalars['Boolean'];
};

export type ComponentEventServingInput = {
  servingFood: Scalars['Boolean'];
  servingAlcohol: Scalars['Boolean'];
};

export type ComponentEventStudent = {
  __typename?: 'ComponentEventStudent';
  id: Scalars['ID'];
  checkStudentYear: Scalars['Boolean'];
  checkProgramOrientation: Scalars['Boolean'];
};

export type ComponentEventStudentInput = {
  checkStudentYear: Scalars['Boolean'];
  checkProgramOrientation: Scalars['Boolean'];
};

export type ComponentEventTicketInput = {
  Tickets?: Maybe<Array<Maybe<ComponentEventInternalTicketInput>>>;
  allowMultiple?: Maybe<Scalars['Boolean']>;
};

export type ComponentEventTicketReference = {
  __typename?: 'ComponentEventTicketReference';
  id: Scalars['ID'];
  reference?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
};

export type ComponentEventTicketReferenceInput = {
  reference?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
};

export type ComponentEventTickets = {
  __typename?: 'ComponentEventTickets';
  id: Scalars['ID'];
  Tickets?: Maybe<Array<Maybe<ComponentEventInternalTicket>>>;
  allowMultiple?: Maybe<Scalars['Boolean']>;
};

export type ComponentFormCheckbox = {
  __typename?: 'ComponentFormCheckbox';
  id: Scalars['ID'];
  label?: Maybe<Scalars['String']>;
  checkBox?: Maybe<Array<Maybe<ComponentFormInternalsCheckboxOption>>>;
};

export type ComponentFormCheckboxInput = {
  label?: Maybe<Scalars['String']>;
  checkBox?: Maybe<Array<Maybe<ComponentFormInternalsCheckboxOptionInput>>>;
};

export type ComponentFormEmail = {
  __typename?: 'ComponentFormEmail';
  id: Scalars['ID'];
  label?: Maybe<Scalars['String']>;
};

export type ComponentFormEmailInput = {
  label?: Maybe<Scalars['String']>;
};

export type ComponentFormEventPassword = {
  __typename?: 'ComponentFormEventPassword';
  id: Scalars['ID'];
  password: Scalars['String'];
  label: Scalars['String'];
};

export type ComponentFormEventPasswordInput = {
  password: Scalars['String'];
  label?: Maybe<Scalars['String']>;
};

export type ComponentFormInput = {
  __typename?: 'ComponentFormInput';
  id: Scalars['ID'];
  label?: Maybe<Scalars['String']>;
  regex?: Maybe<Scalars['String']>;
};

export type ComponentFormInputInput = {
  label?: Maybe<Scalars['String']>;
  regex?: Maybe<Scalars['String']>;
};

export type ComponentFormInternalsCheckboxOption = {
  __typename?: 'ComponentFormInternalsCheckboxOption';
  id: Scalars['ID'];
  value?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Scalars['String']>;
};

export type ComponentFormInternalsCheckboxOptionInput = {
  value?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Scalars['String']>;
};

export type ComponentFormInternalsOption = {
  __typename?: 'ComponentFormInternalsOption';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type ComponentFormInternalsOptionInput = {
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type ComponentFormSelect = {
  __typename?: 'ComponentFormSelect';
  id: Scalars['ID'];
  allowMultiple: Scalars['Boolean'];
  label: Scalars['String'];
  options?: Maybe<Array<Maybe<ComponentFormInternalsOption>>>;
};

export type ComponentFormSelectInput = {
  allowMultiple?: Maybe<Scalars['Boolean']>;
  label: Scalars['String'];
  options?: Maybe<Array<ComponentFormInternalsOptionInput>>;
};



export type Diet = {
  __typename?: 'Diet';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  name: Scalars['String'];
  count: Scalars['Int'];
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  localizations?: Maybe<Array<Maybe<Diet>>>;
};


export type DietLocalizationsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type DietAggregator = {
  __typename?: 'DietAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
  sum?: Maybe<DietAggregatorSum>;
  avg?: Maybe<DietAggregatorAvg>;
  min?: Maybe<DietAggregatorMin>;
  max?: Maybe<DietAggregatorMax>;
};

export type DietAggregatorAvg = {
  __typename?: 'DietAggregatorAvg';
  count?: Maybe<Scalars['Float']>;
};

export type DietAggregatorMax = {
  __typename?: 'DietAggregatorMax';
  count?: Maybe<Scalars['Float']>;
};

export type DietAggregatorMin = {
  __typename?: 'DietAggregatorMin';
  count?: Maybe<Scalars['Float']>;
};

export type DietAggregatorSum = {
  __typename?: 'DietAggregatorSum';
  count?: Maybe<Scalars['Float']>;
};

export type DietConnection = {
  __typename?: 'DietConnection';
  values?: Maybe<Array<Maybe<Diet>>>;
  groupBy?: Maybe<DietGroupBy>;
  aggregate?: Maybe<DietAggregator>;
};

export type DietConnectionCount = {
  __typename?: 'DietConnectionCount';
  key?: Maybe<Scalars['Int']>;
  connection?: Maybe<DietConnection>;
};

export type DietConnectionCreated_At = {
  __typename?: 'DietConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<DietConnection>;
};

export type DietConnectionId = {
  __typename?: 'DietConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<DietConnection>;
};

export type DietConnectionLocale = {
  __typename?: 'DietConnectionLocale';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<DietConnection>;
};

export type DietConnectionName = {
  __typename?: 'DietConnectionName';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<DietConnection>;
};

export type DietConnectionPublished_At = {
  __typename?: 'DietConnectionPublished_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<DietConnection>;
};

export type DietConnectionUpdated_At = {
  __typename?: 'DietConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<DietConnection>;
};

export type DietGroupBy = {
  __typename?: 'DietGroupBy';
  id?: Maybe<Array<Maybe<DietConnectionId>>>;
  created_at?: Maybe<Array<Maybe<DietConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<DietConnectionUpdated_At>>>;
  name?: Maybe<Array<Maybe<DietConnectionName>>>;
  count?: Maybe<Array<Maybe<DietConnectionCount>>>;
  locale?: Maybe<Array<Maybe<DietConnectionLocale>>>;
  published_at?: Maybe<Array<Maybe<DietConnectionPublished_At>>>;
};

export type DietInput = {
  name: Scalars['String'];
  count?: Maybe<Scalars['Int']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export enum Enum_Order_Status {
  Pending = 'pending',
  Failed = 'failed',
  Success = 'success',
  Visited = 'visited'
}

export type Event = {
  __typename?: 'Event';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  title: Scalars['String'];
  slug?: Maybe<Scalars['String']>;
  committee?: Maybe<Committee>;
  category?: Maybe<EventCategory>;
  tickets?: Maybe<ComponentEventTickets>;
  servingOptions?: Maybe<ComponentEventServing>;
  studentOptions?: Maybe<ComponentEventStudent>;
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  deadline: Scalars['DateTime'];
  description: Scalars['String'];
  place?: Maybe<ComponentEventPlace>;
  passwordProtected?: Maybe<ComponentEventPasswordProtect>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  orders?: Maybe<Array<Maybe<Order>>>;
  localizations?: Maybe<Array<Maybe<Event>>>;
};


export type EventOrdersArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type EventLocalizationsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type EventAggregator = {
  __typename?: 'EventAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type EventCategory = {
  __typename?: 'EventCategory';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  name: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  events?: Maybe<Array<Maybe<Event>>>;
  localizations?: Maybe<Array<Maybe<EventCategory>>>;
};


export type EventCategoryEventsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type EventCategoryLocalizationsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type EventCategoryAggregator = {
  __typename?: 'EventCategoryAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type EventCategoryConnection = {
  __typename?: 'EventCategoryConnection';
  values?: Maybe<Array<Maybe<EventCategory>>>;
  groupBy?: Maybe<EventCategoryGroupBy>;
  aggregate?: Maybe<EventCategoryAggregator>;
};

export type EventCategoryConnectionCreated_At = {
  __typename?: 'EventCategoryConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<EventCategoryConnection>;
};

export type EventCategoryConnectionId = {
  __typename?: 'EventCategoryConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<EventCategoryConnection>;
};

export type EventCategoryConnectionLocale = {
  __typename?: 'EventCategoryConnectionLocale';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<EventCategoryConnection>;
};

export type EventCategoryConnectionName = {
  __typename?: 'EventCategoryConnectionName';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<EventCategoryConnection>;
};

export type EventCategoryConnectionPublished_At = {
  __typename?: 'EventCategoryConnectionPublished_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<EventCategoryConnection>;
};

export type EventCategoryConnectionUpdated_At = {
  __typename?: 'EventCategoryConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<EventCategoryConnection>;
};

export type EventCategoryGroupBy = {
  __typename?: 'EventCategoryGroupBy';
  id?: Maybe<Array<Maybe<EventCategoryConnectionId>>>;
  created_at?: Maybe<Array<Maybe<EventCategoryConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<EventCategoryConnectionUpdated_At>>>;
  name?: Maybe<Array<Maybe<EventCategoryConnectionName>>>;
  locale?: Maybe<Array<Maybe<EventCategoryConnectionLocale>>>;
  published_at?: Maybe<Array<Maybe<EventCategoryConnectionPublished_At>>>;
};

export type EventCategoryInput = {
  name: Scalars['String'];
  events?: Maybe<Array<Maybe<Scalars['ID']>>>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EventConnection = {
  __typename?: 'EventConnection';
  values?: Maybe<Array<Maybe<Event>>>;
  groupBy?: Maybe<EventGroupBy>;
  aggregate?: Maybe<EventAggregator>;
};

export type EventConnectionCategory = {
  __typename?: 'EventConnectionCategory';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<EventConnection>;
};

export type EventConnectionCommittee = {
  __typename?: 'EventConnectionCommittee';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<EventConnection>;
};

export type EventConnectionCreated_At = {
  __typename?: 'EventConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<EventConnection>;
};

export type EventConnectionDeadline = {
  __typename?: 'EventConnectionDeadline';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<EventConnection>;
};

export type EventConnectionDescription = {
  __typename?: 'EventConnectionDescription';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<EventConnection>;
};

export type EventConnectionEndTime = {
  __typename?: 'EventConnectionEndTime';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<EventConnection>;
};

export type EventConnectionId = {
  __typename?: 'EventConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<EventConnection>;
};

export type EventConnectionLocale = {
  __typename?: 'EventConnectionLocale';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<EventConnection>;
};

export type EventConnectionPasswordProtected = {
  __typename?: 'EventConnectionPasswordProtected';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<EventConnection>;
};

export type EventConnectionPlace = {
  __typename?: 'EventConnectionPlace';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<EventConnection>;
};

export type EventConnectionPublished_At = {
  __typename?: 'EventConnectionPublished_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<EventConnection>;
};

export type EventConnectionServingOptions = {
  __typename?: 'EventConnectionServingOptions';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<EventConnection>;
};

export type EventConnectionSlug = {
  __typename?: 'EventConnectionSlug';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<EventConnection>;
};

export type EventConnectionStartTime = {
  __typename?: 'EventConnectionStartTime';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<EventConnection>;
};

export type EventConnectionStudentOptions = {
  __typename?: 'EventConnectionStudentOptions';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<EventConnection>;
};

export type EventConnectionTickets = {
  __typename?: 'EventConnectionTickets';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<EventConnection>;
};

export type EventConnectionTitle = {
  __typename?: 'EventConnectionTitle';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<EventConnection>;
};

export type EventConnectionUpdated_At = {
  __typename?: 'EventConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<EventConnection>;
};

export type EventGroupBy = {
  __typename?: 'EventGroupBy';
  id?: Maybe<Array<Maybe<EventConnectionId>>>;
  created_at?: Maybe<Array<Maybe<EventConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<EventConnectionUpdated_At>>>;
  title?: Maybe<Array<Maybe<EventConnectionTitle>>>;
  slug?: Maybe<Array<Maybe<EventConnectionSlug>>>;
  committee?: Maybe<Array<Maybe<EventConnectionCommittee>>>;
  category?: Maybe<Array<Maybe<EventConnectionCategory>>>;
  tickets?: Maybe<Array<Maybe<EventConnectionTickets>>>;
  servingOptions?: Maybe<Array<Maybe<EventConnectionServingOptions>>>;
  studentOptions?: Maybe<Array<Maybe<EventConnectionStudentOptions>>>;
  startTime?: Maybe<Array<Maybe<EventConnectionStartTime>>>;
  endTime?: Maybe<Array<Maybe<EventConnectionEndTime>>>;
  deadline?: Maybe<Array<Maybe<EventConnectionDeadline>>>;
  description?: Maybe<Array<Maybe<EventConnectionDescription>>>;
  place?: Maybe<Array<Maybe<EventConnectionPlace>>>;
  passwordProtected?: Maybe<Array<Maybe<EventConnectionPasswordProtected>>>;
  locale?: Maybe<Array<Maybe<EventConnectionLocale>>>;
  published_at?: Maybe<Array<Maybe<EventConnectionPublished_At>>>;
};

export type EventInput = {
  title: Scalars['String'];
  slug?: Maybe<Scalars['String']>;
  committee?: Maybe<Scalars['ID']>;
  category?: Maybe<Scalars['ID']>;
  tickets?: Maybe<ComponentEventTicketInput>;
  servingOptions?: Maybe<ComponentEventServingInput>;
  studentOptions?: Maybe<ComponentEventStudentInput>;
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  deadline: Scalars['DateTime'];
  description: Scalars['String'];
  place: ComponentEventPlaceInput;
  passwordProtected?: Maybe<ComponentEventPasswordProtectInput>;
  orders?: Maybe<Array<Maybe<Scalars['ID']>>>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type FileInfoInput = {
  name?: Maybe<Scalars['String']>;
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
};

export type FileInput = {
  name: Scalars['String'];
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  formats?: Maybe<Scalars['JSON']>;
  hash: Scalars['String'];
  ext?: Maybe<Scalars['String']>;
  mime: Scalars['String'];
  size: Scalars['Float'];
  url: Scalars['String'];
  previewUrl?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  provider_metadata?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Maybe<Scalars['ID']>>>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type I18NLocale = {
  __typename?: 'I18NLocale';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  name?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
};

export type InputId = {
  id: Scalars['ID'];
};


export type LocaleInput = {
  name?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};


export type Morph = UsersPermissionsMe | UsersPermissionsMeRole | UsersPermissionsLoginPayload | UserPermissionsPasswordPayload | Allergy | AllergyConnection | AllergyAggregator | AllergyAggregatorSum | AllergyAggregatorAvg | AllergyAggregatorMin | AllergyAggregatorMax | AllergyGroupBy | AllergyConnectionId | AllergyConnectionCreated_At | AllergyConnectionUpdated_At | AllergyConnectionName | AllergyConnectionCount | AllergyConnectionLocale | AllergyConnectionPublished_At | CreateAllergyPayload | UpdateAllergyPayload | DeleteAllergyPayload | Category | CategoryConnection | CategoryAggregator | CategoryGroupBy | CategoryConnectionId | CategoryConnectionCreated_At | CategoryConnectionUpdated_At | CategoryConnectionName | CategoryConnectionLocale | CategoryConnectionPublished_At | CreateCategoryPayload | UpdateCategoryPayload | DeleteCategoryPayload | Committee | CommitteeConnection | CommitteeAggregator | CommitteeGroupBy | CommitteeConnectionId | CommitteeConnectionCreated_At | CommitteeConnectionUpdated_At | CommitteeConnectionName | CommitteeConnectionLocale | CommitteeConnectionPublished_At | CreateCommitteePayload | UpdateCommitteePayload | DeleteCommitteePayload | Diet | DietConnection | DietAggregator | DietAggregatorSum | DietAggregatorAvg | DietAggregatorMin | DietAggregatorMax | DietGroupBy | DietConnectionId | DietConnectionCreated_At | DietConnectionUpdated_At | DietConnectionName | DietConnectionCount | DietConnectionLocale | DietConnectionPublished_At | CreateDietPayload | UpdateDietPayload | DeleteDietPayload | EventCategory | EventCategoryConnection | EventCategoryAggregator | EventCategoryGroupBy | EventCategoryConnectionId | EventCategoryConnectionCreated_At | EventCategoryConnectionUpdated_At | EventCategoryConnectionName | EventCategoryConnectionLocale | EventCategoryConnectionPublished_At | CreateEventCategoryPayload | UpdateEventCategoryPayload | DeleteEventCategoryPayload | Event | EventConnection | EventAggregator | EventGroupBy | EventConnectionId | EventConnectionCreated_At | EventConnectionUpdated_At | EventConnectionTitle | EventConnectionSlug | EventConnectionCommittee | EventConnectionCategory | EventConnectionTickets | EventConnectionServingOptions | EventConnectionStudentOptions | EventConnectionStartTime | EventConnectionEndTime | EventConnectionDeadline | EventConnectionDescription | EventConnectionPlace | EventConnectionPasswordProtected | EventConnectionLocale | EventConnectionPublished_At | CreateEventPayload | UpdateEventPayload | DeleteEventPayload | Order | OrderConnection | OrderAggregator | OrderAggregatorSum | OrderAggregatorAvg | OrderAggregatorMin | OrderAggregatorMax | OrderGroupBy | OrderConnectionId | OrderConnectionCreated_At | OrderConnectionUpdated_At | OrderConnectionPaymentId | OrderConnectionStatus | OrderConnectionConsumer | OrderConnectionEvent | OrderConnectionIp | OrderConnectionReference | OrderConnectionAmount | OrderConnectionTimestamp | OrderConnectionPaymentType | OrderConnectionPaymentMethod | CreateOrderPayload | UpdateOrderPayload | DeleteOrderPayload | Post | PostConnection | PostAggregator | PostGroupBy | PostConnectionId | PostConnectionCreated_At | PostConnectionUpdated_At | PostConnectionTitle | PostConnectionDescription | PostConnectionSlug | PostConnectionAdminUser | PostConnectionCommittee | PostConnectionLocale | PostConnectionPublished_At | CreatePostPayload | UpdatePostPayload | DeletePostPayload | I18NLocale | UploadFile | UploadFileConnection | UploadFileAggregator | UploadFileAggregatorSum | UploadFileAggregatorAvg | UploadFileAggregatorMin | UploadFileAggregatorMax | UploadFileGroupBy | UploadFileConnectionId | UploadFileConnectionCreated_At | UploadFileConnectionUpdated_At | UploadFileConnectionName | UploadFileConnectionAlternativeText | UploadFileConnectionCaption | UploadFileConnectionWidth | UploadFileConnectionHeight | UploadFileConnectionFormats | UploadFileConnectionHash | UploadFileConnectionExt | UploadFileConnectionMime | UploadFileConnectionSize | UploadFileConnectionUrl | UploadFileConnectionPreviewUrl | UploadFileConnectionProvider | UploadFileConnectionProvider_Metadata | DeleteFilePayload | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsRoleConnection | UsersPermissionsRoleAggregator | UsersPermissionsRoleGroupBy | UsersPermissionsRoleConnectionId | UsersPermissionsRoleConnectionName | UsersPermissionsRoleConnectionDescription | UsersPermissionsRoleConnectionType | CreateRolePayload | UpdateRolePayload | DeleteRolePayload | UsersPermissionsUser | UsersPermissionsUserConnection | UsersPermissionsUserAggregator | UsersPermissionsUserGroupBy | UsersPermissionsUserConnectionId | UsersPermissionsUserConnectionCreated_At | UsersPermissionsUserConnectionUpdated_At | UsersPermissionsUserConnectionUsername | UsersPermissionsUserConnectionEmail | UsersPermissionsUserConnectionProvider | UsersPermissionsUserConnectionConfirmed | UsersPermissionsUserConnectionBlocked | UsersPermissionsUserConnectionRole | CreateUserPayload | UpdateUserPayload | DeleteUserPayload | ComponentEventInternalStreet | ComponentEventInternalTicket | ComponentEventPasswordProtect | ComponentEventPlace | ComponentEventRecipient | ComponentEventServing | ComponentEventStudent | ComponentEventTicketReference | ComponentEventTickets | ComponentFormInternalsCheckboxOption | ComponentFormInternalsOption | ComponentFormCheckbox | ComponentFormEmail | ComponentFormEventPassword | ComponentFormInput | ComponentFormSelect;

export type Mutation = {
  __typename?: 'Mutation';
  createAllergy?: Maybe<CreateAllergyPayload>;
  updateAllergy?: Maybe<UpdateAllergyPayload>;
  deleteAllergy?: Maybe<DeleteAllergyPayload>;
  createCategory?: Maybe<CreateCategoryPayload>;
  updateCategory?: Maybe<UpdateCategoryPayload>;
  deleteCategory?: Maybe<DeleteCategoryPayload>;
  createCommittee?: Maybe<CreateCommitteePayload>;
  updateCommittee?: Maybe<UpdateCommitteePayload>;
  deleteCommittee?: Maybe<DeleteCommitteePayload>;
  createDiet?: Maybe<CreateDietPayload>;
  updateDiet?: Maybe<UpdateDietPayload>;
  deleteDiet?: Maybe<DeleteDietPayload>;
  createEventCategory?: Maybe<CreateEventCategoryPayload>;
  updateEventCategory?: Maybe<UpdateEventCategoryPayload>;
  deleteEventCategory?: Maybe<DeleteEventCategoryPayload>;
  createEvent?: Maybe<CreateEventPayload>;
  updateEvent?: Maybe<UpdateEventPayload>;
  deleteEvent?: Maybe<DeleteEventPayload>;
  createOrder?: Maybe<CreateOrderPayload>;
  updateOrder?: Maybe<UpdateOrderPayload>;
  deleteOrder?: Maybe<DeleteOrderPayload>;
  createPost?: Maybe<CreatePostPayload>;
  updatePost?: Maybe<UpdatePostPayload>;
  deletePost?: Maybe<DeletePostPayload>;
  /** Delete one file */
  deleteFile?: Maybe<DeleteFilePayload>;
  /** Create a new role */
  createRole?: Maybe<CreateRolePayload>;
  /** Update an existing role */
  updateRole?: Maybe<UpdateRolePayload>;
  /** Delete an existing role */
  deleteRole?: Maybe<DeleteRolePayload>;
  /** Create a new user */
  createUser?: Maybe<CreateUserPayload>;
  /** Update an existing user */
  updateUser?: Maybe<UpdateUserPayload>;
  /** Delete an existing user */
  deleteUser?: Maybe<DeleteUserPayload>;
  createAllergyLocalization: Allergy;
  createCategoryLocalization: Category;
  createCommitteeLocalization: Committee;
  createDietLocalization: Diet;
  createEventCategoryLocalization: EventCategory;
  createEventLocalization: Event;
  createPostLocalization: Post;
  upload: UploadFile;
  multipleUpload: Array<Maybe<UploadFile>>;
  updateFileInfo: UploadFile;
  login: UsersPermissionsLoginPayload;
  register: UsersPermissionsLoginPayload;
  forgotPassword?: Maybe<UserPermissionsPasswordPayload>;
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
};


export type MutationCreateAllergyArgs = {
  input?: Maybe<CreateAllergyInput>;
};


export type MutationUpdateAllergyArgs = {
  input?: Maybe<UpdateAllergyInput>;
};


export type MutationDeleteAllergyArgs = {
  input?: Maybe<DeleteAllergyInput>;
};


export type MutationCreateCategoryArgs = {
  input?: Maybe<CreateCategoryInput>;
};


export type MutationUpdateCategoryArgs = {
  input?: Maybe<UpdateCategoryInput>;
};


export type MutationDeleteCategoryArgs = {
  input?: Maybe<DeleteCategoryInput>;
};


export type MutationCreateCommitteeArgs = {
  input?: Maybe<CreateCommitteeInput>;
};


export type MutationUpdateCommitteeArgs = {
  input?: Maybe<UpdateCommitteeInput>;
};


export type MutationDeleteCommitteeArgs = {
  input?: Maybe<DeleteCommitteeInput>;
};


export type MutationCreateDietArgs = {
  input?: Maybe<CreateDietInput>;
};


export type MutationUpdateDietArgs = {
  input?: Maybe<UpdateDietInput>;
};


export type MutationDeleteDietArgs = {
  input?: Maybe<DeleteDietInput>;
};


export type MutationCreateEventCategoryArgs = {
  input?: Maybe<CreateEventCategoryInput>;
};


export type MutationUpdateEventCategoryArgs = {
  input?: Maybe<UpdateEventCategoryInput>;
};


export type MutationDeleteEventCategoryArgs = {
  input?: Maybe<DeleteEventCategoryInput>;
};


export type MutationCreateEventArgs = {
  input?: Maybe<CreateEventInput>;
};


export type MutationUpdateEventArgs = {
  input?: Maybe<UpdateEventInput>;
};


export type MutationDeleteEventArgs = {
  input?: Maybe<DeleteEventInput>;
};


export type MutationCreateOrderArgs = {
  input?: Maybe<CreateOrderInput>;
};


export type MutationUpdateOrderArgs = {
  input?: Maybe<UpdateOrderInput>;
};


export type MutationDeleteOrderArgs = {
  input?: Maybe<DeleteOrderInput>;
};


export type MutationCreatePostArgs = {
  input?: Maybe<CreatePostInput>;
};


export type MutationUpdatePostArgs = {
  input?: Maybe<UpdatePostInput>;
};


export type MutationDeletePostArgs = {
  input?: Maybe<DeletePostInput>;
};


export type MutationDeleteFileArgs = {
  input?: Maybe<DeleteFileInput>;
};


export type MutationCreateRoleArgs = {
  input?: Maybe<CreateRoleInput>;
};


export type MutationUpdateRoleArgs = {
  input?: Maybe<UpdateRoleInput>;
};


export type MutationDeleteRoleArgs = {
  input?: Maybe<DeleteRoleInput>;
};


export type MutationCreateUserArgs = {
  input?: Maybe<CreateUserInput>;
};


export type MutationUpdateUserArgs = {
  input?: Maybe<UpdateUserInput>;
};


export type MutationDeleteUserArgs = {
  input?: Maybe<DeleteUserInput>;
};


export type MutationCreateAllergyLocalizationArgs = {
  input: UpdateAllergyInput;
};


export type MutationCreateCategoryLocalizationArgs = {
  input: UpdateCategoryInput;
};


export type MutationCreateCommitteeLocalizationArgs = {
  input: UpdateCommitteeInput;
};


export type MutationCreateDietLocalizationArgs = {
  input: UpdateDietInput;
};


export type MutationCreateEventCategoryLocalizationArgs = {
  input: UpdateEventCategoryInput;
};


export type MutationCreateEventLocalizationArgs = {
  input: UpdateEventInput;
};


export type MutationCreatePostLocalizationArgs = {
  input: UpdatePostInput;
};


export type MutationUploadArgs = {
  refId?: Maybe<Scalars['ID']>;
  ref?: Maybe<Scalars['String']>;
  field?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
  info?: Maybe<FileInfoInput>;
  file: Scalars['Upload'];
};


export type MutationMultipleUploadArgs = {
  refId?: Maybe<Scalars['ID']>;
  ref?: Maybe<Scalars['String']>;
  field?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
  files: Array<Maybe<Scalars['Upload']>>;
};


export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID'];
  info: FileInfoInput;
};


export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};


export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
  code: Scalars['String'];
};


export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String'];
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  paymentId?: Maybe<Scalars['String']>;
  status?: Maybe<Enum_Order_Status>;
  consumer?: Maybe<ComponentEventRecipient>;
  event?: Maybe<Event>;
  ticketReference?: Maybe<Array<Maybe<ComponentEventTicketReference>>>;
  ip?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['Float']>;
  timestamp?: Maybe<Scalars['String']>;
  paymentType?: Maybe<Scalars['String']>;
  paymentMethod?: Maybe<Scalars['String']>;
};

export type OrderAggregator = {
  __typename?: 'OrderAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
  sum?: Maybe<OrderAggregatorSum>;
  avg?: Maybe<OrderAggregatorAvg>;
  min?: Maybe<OrderAggregatorMin>;
  max?: Maybe<OrderAggregatorMax>;
};

export type OrderAggregatorAvg = {
  __typename?: 'OrderAggregatorAvg';
  amount?: Maybe<Scalars['Float']>;
};

export type OrderAggregatorMax = {
  __typename?: 'OrderAggregatorMax';
  amount?: Maybe<Scalars['Float']>;
};

export type OrderAggregatorMin = {
  __typename?: 'OrderAggregatorMin';
  amount?: Maybe<Scalars['Float']>;
};

export type OrderAggregatorSum = {
  __typename?: 'OrderAggregatorSum';
  amount?: Maybe<Scalars['Float']>;
};

export type OrderConnection = {
  __typename?: 'OrderConnection';
  values?: Maybe<Array<Maybe<Order>>>;
  groupBy?: Maybe<OrderGroupBy>;
  aggregate?: Maybe<OrderAggregator>;
};

export type OrderConnectionAmount = {
  __typename?: 'OrderConnectionAmount';
  key?: Maybe<Scalars['Float']>;
  connection?: Maybe<OrderConnection>;
};

export type OrderConnectionConsumer = {
  __typename?: 'OrderConnectionConsumer';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<OrderConnection>;
};

export type OrderConnectionCreated_At = {
  __typename?: 'OrderConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<OrderConnection>;
};

export type OrderConnectionEvent = {
  __typename?: 'OrderConnectionEvent';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<OrderConnection>;
};

export type OrderConnectionId = {
  __typename?: 'OrderConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<OrderConnection>;
};

export type OrderConnectionIp = {
  __typename?: 'OrderConnectionIp';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<OrderConnection>;
};

export type OrderConnectionPaymentId = {
  __typename?: 'OrderConnectionPaymentId';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<OrderConnection>;
};

export type OrderConnectionPaymentMethod = {
  __typename?: 'OrderConnectionPaymentMethod';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<OrderConnection>;
};

export type OrderConnectionPaymentType = {
  __typename?: 'OrderConnectionPaymentType';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<OrderConnection>;
};

export type OrderConnectionReference = {
  __typename?: 'OrderConnectionReference';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<OrderConnection>;
};

export type OrderConnectionStatus = {
  __typename?: 'OrderConnectionStatus';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<OrderConnection>;
};

export type OrderConnectionTimestamp = {
  __typename?: 'OrderConnectionTimestamp';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<OrderConnection>;
};

export type OrderConnectionUpdated_At = {
  __typename?: 'OrderConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<OrderConnection>;
};

export type OrderGroupBy = {
  __typename?: 'OrderGroupBy';
  id?: Maybe<Array<Maybe<OrderConnectionId>>>;
  created_at?: Maybe<Array<Maybe<OrderConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<OrderConnectionUpdated_At>>>;
  paymentId?: Maybe<Array<Maybe<OrderConnectionPaymentId>>>;
  status?: Maybe<Array<Maybe<OrderConnectionStatus>>>;
  consumer?: Maybe<Array<Maybe<OrderConnectionConsumer>>>;
  event?: Maybe<Array<Maybe<OrderConnectionEvent>>>;
  ip?: Maybe<Array<Maybe<OrderConnectionIp>>>;
  reference?: Maybe<Array<Maybe<OrderConnectionReference>>>;
  amount?: Maybe<Array<Maybe<OrderConnectionAmount>>>;
  timestamp?: Maybe<Array<Maybe<OrderConnectionTimestamp>>>;
  paymentType?: Maybe<Array<Maybe<OrderConnectionPaymentType>>>;
  paymentMethod?: Maybe<Array<Maybe<OrderConnectionPaymentMethod>>>;
};

export type OrderInput = {
  paymentId?: Maybe<Scalars['String']>;
  status?: Maybe<Enum_Order_Status>;
  consumer?: Maybe<ComponentEventRecipientInput>;
  event?: Maybe<Scalars['ID']>;
  ticketReference?: Maybe<Array<Maybe<ComponentEventTicketReferenceInput>>>;
  ip?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['Float']>;
  timestamp?: Maybe<Scalars['String']>;
  paymentType?: Maybe<Scalars['String']>;
  paymentMethod?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  title: Scalars['String'];
  description: Scalars['String'];
  slug?: Maybe<Scalars['String']>;
  adminUser?: Maybe<AdminUser>;
  committee?: Maybe<Committee>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  categories?: Maybe<Array<Maybe<Category>>>;
  localizations?: Maybe<Array<Maybe<Post>>>;
};


export type PostCategoriesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type PostLocalizationsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type PostAggregator = {
  __typename?: 'PostAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type PostConnection = {
  __typename?: 'PostConnection';
  values?: Maybe<Array<Maybe<Post>>>;
  groupBy?: Maybe<PostGroupBy>;
  aggregate?: Maybe<PostAggregator>;
};

export type PostConnectionAdminUser = {
  __typename?: 'PostConnectionAdminUser';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<PostConnection>;
};

export type PostConnectionCommittee = {
  __typename?: 'PostConnectionCommittee';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<PostConnection>;
};

export type PostConnectionCreated_At = {
  __typename?: 'PostConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<PostConnection>;
};

export type PostConnectionDescription = {
  __typename?: 'PostConnectionDescription';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<PostConnection>;
};

export type PostConnectionId = {
  __typename?: 'PostConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<PostConnection>;
};

export type PostConnectionLocale = {
  __typename?: 'PostConnectionLocale';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<PostConnection>;
};

export type PostConnectionPublished_At = {
  __typename?: 'PostConnectionPublished_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<PostConnection>;
};

export type PostConnectionSlug = {
  __typename?: 'PostConnectionSlug';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<PostConnection>;
};

export type PostConnectionTitle = {
  __typename?: 'PostConnectionTitle';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<PostConnection>;
};

export type PostConnectionUpdated_At = {
  __typename?: 'PostConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<PostConnection>;
};

export type PostGroupBy = {
  __typename?: 'PostGroupBy';
  id?: Maybe<Array<Maybe<PostConnectionId>>>;
  created_at?: Maybe<Array<Maybe<PostConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<PostConnectionUpdated_At>>>;
  title?: Maybe<Array<Maybe<PostConnectionTitle>>>;
  description?: Maybe<Array<Maybe<PostConnectionDescription>>>;
  slug?: Maybe<Array<Maybe<PostConnectionSlug>>>;
  adminUser?: Maybe<Array<Maybe<PostConnectionAdminUser>>>;
  committee?: Maybe<Array<Maybe<PostConnectionCommittee>>>;
  locale?: Maybe<Array<Maybe<PostConnectionLocale>>>;
  published_at?: Maybe<Array<Maybe<PostConnectionPublished_At>>>;
};

export type PostInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  slug?: Maybe<Scalars['String']>;
  adminUser?: Maybe<Scalars['ID']>;
  committee?: Maybe<Scalars['ID']>;
  categories?: Maybe<Array<Maybe<Scalars['ID']>>>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export enum PublicationState {
  Live = 'LIVE',
  Preview = 'PREVIEW'
}

export type Query = {
  __typename?: 'Query';
  allergy?: Maybe<Allergy>;
  allergies?: Maybe<Array<Maybe<Allergy>>>;
  allergiesConnection?: Maybe<AllergyConnection>;
  category?: Maybe<Category>;
  categories?: Maybe<Array<Maybe<Category>>>;
  categoriesConnection?: Maybe<CategoryConnection>;
  committee?: Maybe<Committee>;
  committees?: Maybe<Array<Maybe<Committee>>>;
  committeesConnection?: Maybe<CommitteeConnection>;
  diet?: Maybe<Diet>;
  diets?: Maybe<Array<Maybe<Diet>>>;
  dietsConnection?: Maybe<DietConnection>;
  eventCategory?: Maybe<EventCategory>;
  eventCategories?: Maybe<Array<Maybe<EventCategory>>>;
  eventCategoriesConnection?: Maybe<EventCategoryConnection>;
  event?: Maybe<Event>;
  events?: Maybe<Array<Maybe<Event>>>;
  eventsConnection?: Maybe<EventConnection>;
  order?: Maybe<Order>;
  orders?: Maybe<Array<Maybe<Order>>>;
  ordersConnection?: Maybe<OrderConnection>;
  post?: Maybe<Post>;
  posts?: Maybe<Array<Maybe<Post>>>;
  postsConnection?: Maybe<PostConnection>;
  files?: Maybe<Array<Maybe<UploadFile>>>;
  filesConnection?: Maybe<UploadFileConnection>;
  role?: Maybe<UsersPermissionsRole>;
  /** Retrieve all the existing roles. You can't apply filters on this query. */
  roles?: Maybe<Array<Maybe<UsersPermissionsRole>>>;
  rolesConnection?: Maybe<UsersPermissionsRoleConnection>;
  user?: Maybe<UsersPermissionsUser>;
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
  usersConnection?: Maybe<UsersPermissionsUserConnection>;
  me?: Maybe<UsersPermissionsMe>;
  eventBySlug?: Maybe<Event>;
};


export type QueryAllergyArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryAllergiesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryAllergiesConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryCategoryArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryCategoriesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryCategoriesConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryCommitteeArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryCommitteesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryCommitteesConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryDietArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryDietsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryDietsConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryEventCategoryArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryEventCategoriesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryEventCategoriesConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryEventArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryEventsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryEventsConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryOrderArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryOrdersArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
};


export type QueryOrdersConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryPostArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryPostsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryPostsConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryFilesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
};


export type QueryFilesConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryRoleArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryRolesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
};


export type QueryRolesConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryUsersArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
};


export type QueryUsersConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryEventBySlugArgs = {
  slug: Scalars['String'];
};

export type RoleInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Maybe<Scalars['ID']>>>;
  users?: Maybe<Array<Maybe<Scalars['ID']>>>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};



export type UploadFile = {
  __typename?: 'UploadFile';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  name: Scalars['String'];
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  formats?: Maybe<Scalars['JSON']>;
  hash: Scalars['String'];
  ext?: Maybe<Scalars['String']>;
  mime: Scalars['String'];
  size: Scalars['Float'];
  url: Scalars['String'];
  previewUrl?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  provider_metadata?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Maybe<Morph>>>;
};


export type UploadFileRelatedArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type UploadFileAggregator = {
  __typename?: 'UploadFileAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
  sum?: Maybe<UploadFileAggregatorSum>;
  avg?: Maybe<UploadFileAggregatorAvg>;
  min?: Maybe<UploadFileAggregatorMin>;
  max?: Maybe<UploadFileAggregatorMax>;
};

export type UploadFileAggregatorAvg = {
  __typename?: 'UploadFileAggregatorAvg';
  width?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
};

export type UploadFileAggregatorMax = {
  __typename?: 'UploadFileAggregatorMax';
  width?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
};

export type UploadFileAggregatorMin = {
  __typename?: 'UploadFileAggregatorMin';
  width?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
};

export type UploadFileAggregatorSum = {
  __typename?: 'UploadFileAggregatorSum';
  width?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  size?: Maybe<Scalars['Float']>;
};

export type UploadFileConnection = {
  __typename?: 'UploadFileConnection';
  values?: Maybe<Array<Maybe<UploadFile>>>;
  groupBy?: Maybe<UploadFileGroupBy>;
  aggregate?: Maybe<UploadFileAggregator>;
};

export type UploadFileConnectionAlternativeText = {
  __typename?: 'UploadFileConnectionAlternativeText';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionCaption = {
  __typename?: 'UploadFileConnectionCaption';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionCreated_At = {
  __typename?: 'UploadFileConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionExt = {
  __typename?: 'UploadFileConnectionExt';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionFormats = {
  __typename?: 'UploadFileConnectionFormats';
  key?: Maybe<Scalars['JSON']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionHash = {
  __typename?: 'UploadFileConnectionHash';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionHeight = {
  __typename?: 'UploadFileConnectionHeight';
  key?: Maybe<Scalars['Int']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionId = {
  __typename?: 'UploadFileConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionMime = {
  __typename?: 'UploadFileConnectionMime';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionName = {
  __typename?: 'UploadFileConnectionName';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionPreviewUrl = {
  __typename?: 'UploadFileConnectionPreviewUrl';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionProvider = {
  __typename?: 'UploadFileConnectionProvider';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionProvider_Metadata = {
  __typename?: 'UploadFileConnectionProvider_metadata';
  key?: Maybe<Scalars['JSON']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionSize = {
  __typename?: 'UploadFileConnectionSize';
  key?: Maybe<Scalars['Float']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionUpdated_At = {
  __typename?: 'UploadFileConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionUrl = {
  __typename?: 'UploadFileConnectionUrl';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionWidth = {
  __typename?: 'UploadFileConnectionWidth';
  key?: Maybe<Scalars['Int']>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileGroupBy = {
  __typename?: 'UploadFileGroupBy';
  id?: Maybe<Array<Maybe<UploadFileConnectionId>>>;
  created_at?: Maybe<Array<Maybe<UploadFileConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<UploadFileConnectionUpdated_At>>>;
  name?: Maybe<Array<Maybe<UploadFileConnectionName>>>;
  alternativeText?: Maybe<Array<Maybe<UploadFileConnectionAlternativeText>>>;
  caption?: Maybe<Array<Maybe<UploadFileConnectionCaption>>>;
  width?: Maybe<Array<Maybe<UploadFileConnectionWidth>>>;
  height?: Maybe<Array<Maybe<UploadFileConnectionHeight>>>;
  formats?: Maybe<Array<Maybe<UploadFileConnectionFormats>>>;
  hash?: Maybe<Array<Maybe<UploadFileConnectionHash>>>;
  ext?: Maybe<Array<Maybe<UploadFileConnectionExt>>>;
  mime?: Maybe<Array<Maybe<UploadFileConnectionMime>>>;
  size?: Maybe<Array<Maybe<UploadFileConnectionSize>>>;
  url?: Maybe<Array<Maybe<UploadFileConnectionUrl>>>;
  previewUrl?: Maybe<Array<Maybe<UploadFileConnectionPreviewUrl>>>;
  provider?: Maybe<Array<Maybe<UploadFileConnectionProvider>>>;
  provider_metadata?: Maybe<Array<Maybe<UploadFileConnectionProvider_Metadata>>>;
};

export type UserInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  provider?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  resetPasswordToken?: Maybe<Scalars['String']>;
  confirmationToken?: Maybe<Scalars['String']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  blocked?: Maybe<Scalars['Boolean']>;
  role?: Maybe<Scalars['ID']>;
  committees?: Maybe<Array<Maybe<Scalars['ID']>>>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type UserPermissionsPasswordPayload = {
  __typename?: 'UserPermissionsPasswordPayload';
  ok: Scalars['Boolean'];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String'];
  password: Scalars['String'];
  provider?: Maybe<Scalars['String']>;
};

export type UsersPermissionsLoginPayload = {
  __typename?: 'UsersPermissionsLoginPayload';
  jwt?: Maybe<Scalars['String']>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe';
  id: Scalars['ID'];
  username: Scalars['String'];
  email: Scalars['String'];
  confirmed?: Maybe<Scalars['Boolean']>;
  blocked?: Maybe<Scalars['Boolean']>;
  role?: Maybe<UsersPermissionsMeRole>;
};

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission';
  id: Scalars['ID'];
  type: Scalars['String'];
  controller: Scalars['String'];
  action: Scalars['String'];
  enabled: Scalars['Boolean'];
  policy?: Maybe<Scalars['String']>;
  role?: Maybe<UsersPermissionsRole>;
};

export type UsersPermissionsRegisterInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Maybe<UsersPermissionsPermission>>>;
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
};


export type UsersPermissionsRolePermissionsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type UsersPermissionsRoleUsersArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type UsersPermissionsRoleAggregator = {
  __typename?: 'UsersPermissionsRoleAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type UsersPermissionsRoleConnection = {
  __typename?: 'UsersPermissionsRoleConnection';
  values?: Maybe<Array<Maybe<UsersPermissionsRole>>>;
  groupBy?: Maybe<UsersPermissionsRoleGroupBy>;
  aggregate?: Maybe<UsersPermissionsRoleAggregator>;
};

export type UsersPermissionsRoleConnectionDescription = {
  __typename?: 'UsersPermissionsRoleConnectionDescription';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UsersPermissionsRoleConnection>;
};

export type UsersPermissionsRoleConnectionId = {
  __typename?: 'UsersPermissionsRoleConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<UsersPermissionsRoleConnection>;
};

export type UsersPermissionsRoleConnectionName = {
  __typename?: 'UsersPermissionsRoleConnectionName';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UsersPermissionsRoleConnection>;
};

export type UsersPermissionsRoleConnectionType = {
  __typename?: 'UsersPermissionsRoleConnectionType';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UsersPermissionsRoleConnection>;
};

export type UsersPermissionsRoleGroupBy = {
  __typename?: 'UsersPermissionsRoleGroupBy';
  id?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionId>>>;
  name?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionName>>>;
  description?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionDescription>>>;
  type?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionType>>>;
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  username: Scalars['String'];
  email: Scalars['String'];
  provider?: Maybe<Scalars['String']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  blocked?: Maybe<Scalars['Boolean']>;
  role?: Maybe<UsersPermissionsRole>;
  committees?: Maybe<Array<Maybe<Committee>>>;
};


export type UsersPermissionsUserCommitteesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type UsersPermissionsUserAggregator = {
  __typename?: 'UsersPermissionsUserAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type UsersPermissionsUserConnection = {
  __typename?: 'UsersPermissionsUserConnection';
  values?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
  groupBy?: Maybe<UsersPermissionsUserGroupBy>;
  aggregate?: Maybe<UsersPermissionsUserAggregator>;
};

export type UsersPermissionsUserConnectionBlocked = {
  __typename?: 'UsersPermissionsUserConnectionBlocked';
  key?: Maybe<Scalars['Boolean']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionConfirmed = {
  __typename?: 'UsersPermissionsUserConnectionConfirmed';
  key?: Maybe<Scalars['Boolean']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionCreated_At = {
  __typename?: 'UsersPermissionsUserConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionEmail = {
  __typename?: 'UsersPermissionsUserConnectionEmail';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionId = {
  __typename?: 'UsersPermissionsUserConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionProvider = {
  __typename?: 'UsersPermissionsUserConnectionProvider';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionRole = {
  __typename?: 'UsersPermissionsUserConnectionRole';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionUpdated_At = {
  __typename?: 'UsersPermissionsUserConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionUsername = {
  __typename?: 'UsersPermissionsUserConnectionUsername';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserGroupBy = {
  __typename?: 'UsersPermissionsUserGroupBy';
  id?: Maybe<Array<Maybe<UsersPermissionsUserConnectionId>>>;
  created_at?: Maybe<Array<Maybe<UsersPermissionsUserConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUpdated_At>>>;
  username?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUsername>>>;
  email?: Maybe<Array<Maybe<UsersPermissionsUserConnectionEmail>>>;
  provider?: Maybe<Array<Maybe<UsersPermissionsUserConnectionProvider>>>;
  confirmed?: Maybe<Array<Maybe<UsersPermissionsUserConnectionConfirmed>>>;
  blocked?: Maybe<Array<Maybe<UsersPermissionsUserConnectionBlocked>>>;
  role?: Maybe<Array<Maybe<UsersPermissionsUserConnectionRole>>>;
};

export type CreateAllergyInput = {
  data?: Maybe<AllergyInput>;
};

export type CreateAllergyPayload = {
  __typename?: 'createAllergyPayload';
  allergy?: Maybe<Allergy>;
};

export type CreateCategoryInput = {
  data?: Maybe<CategoryInput>;
};

export type CreateCategoryPayload = {
  __typename?: 'createCategoryPayload';
  category?: Maybe<Category>;
};

export type CreateCommitteeInput = {
  data?: Maybe<CommitteeInput>;
};

export type CreateCommitteePayload = {
  __typename?: 'createCommitteePayload';
  committee?: Maybe<Committee>;
};

export type CreateDietInput = {
  data?: Maybe<DietInput>;
};

export type CreateDietPayload = {
  __typename?: 'createDietPayload';
  diet?: Maybe<Diet>;
};

export type CreateEventCategoryInput = {
  data?: Maybe<EventCategoryInput>;
};

export type CreateEventCategoryPayload = {
  __typename?: 'createEventCategoryPayload';
  eventCategory?: Maybe<EventCategory>;
};

export type CreateEventInput = {
  data?: Maybe<EventInput>;
};

export type CreateEventPayload = {
  __typename?: 'createEventPayload';
  event?: Maybe<Event>;
};

export type CreateOrderInput = {
  data?: Maybe<OrderInput>;
};

export type CreateOrderPayload = {
  __typename?: 'createOrderPayload';
  order?: Maybe<Order>;
};

export type CreatePostInput = {
  data?: Maybe<PostInput>;
};

export type CreatePostPayload = {
  __typename?: 'createPostPayload';
  post?: Maybe<Post>;
};

export type CreateRoleInput = {
  data?: Maybe<RoleInput>;
};

export type CreateRolePayload = {
  __typename?: 'createRolePayload';
  role?: Maybe<UsersPermissionsRole>;
};

export type CreateUserInput = {
  data?: Maybe<UserInput>;
};

export type CreateUserPayload = {
  __typename?: 'createUserPayload';
  user?: Maybe<UsersPermissionsUser>;
};

export type DeleteAllergyInput = {
  where?: Maybe<InputId>;
};

export type DeleteAllergyPayload = {
  __typename?: 'deleteAllergyPayload';
  allergy?: Maybe<Allergy>;
};

export type DeleteCategoryInput = {
  where?: Maybe<InputId>;
};

export type DeleteCategoryPayload = {
  __typename?: 'deleteCategoryPayload';
  category?: Maybe<Category>;
};

export type DeleteCommitteeInput = {
  where?: Maybe<InputId>;
};

export type DeleteCommitteePayload = {
  __typename?: 'deleteCommitteePayload';
  committee?: Maybe<Committee>;
};

export type DeleteDietInput = {
  where?: Maybe<InputId>;
};

export type DeleteDietPayload = {
  __typename?: 'deleteDietPayload';
  diet?: Maybe<Diet>;
};

export type DeleteEventCategoryInput = {
  where?: Maybe<InputId>;
};

export type DeleteEventCategoryPayload = {
  __typename?: 'deleteEventCategoryPayload';
  eventCategory?: Maybe<EventCategory>;
};

export type DeleteEventInput = {
  where?: Maybe<InputId>;
};

export type DeleteEventPayload = {
  __typename?: 'deleteEventPayload';
  event?: Maybe<Event>;
};

export type DeleteFileInput = {
  where?: Maybe<InputId>;
};

export type DeleteFilePayload = {
  __typename?: 'deleteFilePayload';
  file?: Maybe<UploadFile>;
};

export type DeleteOrderInput = {
  where?: Maybe<InputId>;
};

export type DeleteOrderPayload = {
  __typename?: 'deleteOrderPayload';
  order?: Maybe<Order>;
};

export type DeletePostInput = {
  where?: Maybe<InputId>;
};

export type DeletePostPayload = {
  __typename?: 'deletePostPayload';
  post?: Maybe<Post>;
};

export type DeleteRoleInput = {
  where?: Maybe<InputId>;
};

export type DeleteRolePayload = {
  __typename?: 'deleteRolePayload';
  role?: Maybe<UsersPermissionsRole>;
};

export type DeleteUserInput = {
  where?: Maybe<InputId>;
};

export type DeleteUserPayload = {
  __typename?: 'deleteUserPayload';
  user?: Maybe<UsersPermissionsUser>;
};

export type EditAllergyInput = {
  name?: Maybe<Scalars['String']>;
  count?: Maybe<Scalars['Int']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditCategoryInput = {
  name?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Maybe<Scalars['ID']>>>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditCommitteeInput = {
  name?: Maybe<Scalars['String']>;
  adminUsers?: Maybe<Array<Maybe<Scalars['ID']>>>;
  users?: Maybe<Array<Maybe<Scalars['ID']>>>;
  events?: Maybe<Array<Maybe<Scalars['ID']>>>;
  posts?: Maybe<Array<Maybe<Scalars['ID']>>>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditComponentEventInternalStreetInput = {
  id?: Maybe<Scalars['ID']>;
  streetName?: Maybe<Scalars['String']>;
  streetPostalCode?: Maybe<Scalars['Int']>;
};

export type EditComponentEventInternalTicketInput = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
};

export type EditComponentEventPasswordProtectInput = {
  id?: Maybe<Scalars['ID']>;
  password?: Maybe<Scalars['String']>;
};

export type EditComponentEventPlaceInput = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  detailedStreetInfo?: Maybe<EditComponentEventInternalStreetInput>;
  showMap?: Maybe<Scalars['Boolean']>;
};

export type EditComponentEventRecipientInput = {
  id?: Maybe<Scalars['ID']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
};

export type EditComponentEventServingInput = {
  id?: Maybe<Scalars['ID']>;
  servingFood?: Maybe<Scalars['Boolean']>;
  servingAlcohol?: Maybe<Scalars['Boolean']>;
};

export type EditComponentEventStudentInput = {
  id?: Maybe<Scalars['ID']>;
  checkStudentYear?: Maybe<Scalars['Boolean']>;
  checkProgramOrientation?: Maybe<Scalars['Boolean']>;
};

export type EditComponentEventTicketInput = {
  id?: Maybe<Scalars['ID']>;
  Tickets?: Maybe<Array<Maybe<EditComponentEventInternalTicketInput>>>;
  allowMultiple?: Maybe<Scalars['Boolean']>;
};

export type EditComponentEventTicketReferenceInput = {
  id?: Maybe<Scalars['ID']>;
  reference?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
};

export type EditComponentFormCheckboxInput = {
  id?: Maybe<Scalars['ID']>;
  label?: Maybe<Scalars['String']>;
  checkBox?: Maybe<Array<Maybe<EditComponentFormInternalsCheckboxOptionInput>>>;
};

export type EditComponentFormEmailInput = {
  id?: Maybe<Scalars['ID']>;
  label?: Maybe<Scalars['String']>;
};

export type EditComponentFormEventPasswordInput = {
  id?: Maybe<Scalars['ID']>;
  password?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
};

export type EditComponentFormInputInput = {
  id?: Maybe<Scalars['ID']>;
  label?: Maybe<Scalars['String']>;
  regex?: Maybe<Scalars['String']>;
};

export type EditComponentFormInternalsCheckboxOptionInput = {
  id?: Maybe<Scalars['ID']>;
  value?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Scalars['String']>;
};

export type EditComponentFormInternalsOptionInput = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type EditComponentFormSelectInput = {
  id?: Maybe<Scalars['ID']>;
  allowMultiple?: Maybe<Scalars['Boolean']>;
  label?: Maybe<Scalars['String']>;
  options?: Maybe<Array<Maybe<EditComponentFormInternalsOptionInput>>>;
};

export type EditDietInput = {
  name?: Maybe<Scalars['String']>;
  count?: Maybe<Scalars['Int']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditEventCategoryInput = {
  name?: Maybe<Scalars['String']>;
  events?: Maybe<Array<Maybe<Scalars['ID']>>>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditEventInput = {
  title?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  committee?: Maybe<Scalars['ID']>;
  category?: Maybe<Scalars['ID']>;
  tickets?: Maybe<EditComponentEventTicketInput>;
  servingOptions?: Maybe<EditComponentEventServingInput>;
  studentOptions?: Maybe<EditComponentEventStudentInput>;
  startTime?: Maybe<Scalars['DateTime']>;
  endTime?: Maybe<Scalars['DateTime']>;
  deadline?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  place?: Maybe<EditComponentEventPlaceInput>;
  passwordProtected?: Maybe<EditComponentEventPasswordProtectInput>;
  orders?: Maybe<Array<Maybe<Scalars['ID']>>>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditFileInput = {
  name?: Maybe<Scalars['String']>;
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  formats?: Maybe<Scalars['JSON']>;
  hash?: Maybe<Scalars['String']>;
  ext?: Maybe<Scalars['String']>;
  mime?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Float']>;
  url?: Maybe<Scalars['String']>;
  previewUrl?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  provider_metadata?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Maybe<Scalars['ID']>>>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditLocaleInput = {
  name?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditOrderInput = {
  paymentId?: Maybe<Scalars['String']>;
  status?: Maybe<Enum_Order_Status>;
  consumer?: Maybe<EditComponentEventRecipientInput>;
  event?: Maybe<Scalars['ID']>;
  ticketReference?: Maybe<Array<Maybe<EditComponentEventTicketReferenceInput>>>;
  ip?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['Float']>;
  timestamp?: Maybe<Scalars['String']>;
  paymentType?: Maybe<Scalars['String']>;
  paymentMethod?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditPostInput = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  adminUser?: Maybe<Scalars['ID']>;
  committee?: Maybe<Scalars['ID']>;
  categories?: Maybe<Array<Maybe<Scalars['ID']>>>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditRoleInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Maybe<Scalars['ID']>>>;
  users?: Maybe<Array<Maybe<Scalars['ID']>>>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditUserInput = {
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  resetPasswordToken?: Maybe<Scalars['String']>;
  confirmationToken?: Maybe<Scalars['String']>;
  confirmed?: Maybe<Scalars['Boolean']>;
  blocked?: Maybe<Scalars['Boolean']>;
  role?: Maybe<Scalars['ID']>;
  committees?: Maybe<Array<Maybe<Scalars['ID']>>>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type UpdateAllergyInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditAllergyInput>;
};

export type UpdateAllergyPayload = {
  __typename?: 'updateAllergyPayload';
  allergy?: Maybe<Allergy>;
};

export type UpdateCategoryInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditCategoryInput>;
};

export type UpdateCategoryPayload = {
  __typename?: 'updateCategoryPayload';
  category?: Maybe<Category>;
};

export type UpdateCommitteeInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditCommitteeInput>;
};

export type UpdateCommitteePayload = {
  __typename?: 'updateCommitteePayload';
  committee?: Maybe<Committee>;
};

export type UpdateDietInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditDietInput>;
};

export type UpdateDietPayload = {
  __typename?: 'updateDietPayload';
  diet?: Maybe<Diet>;
};

export type UpdateEventCategoryInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditEventCategoryInput>;
};

export type UpdateEventCategoryPayload = {
  __typename?: 'updateEventCategoryPayload';
  eventCategory?: Maybe<EventCategory>;
};

export type UpdateEventInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditEventInput>;
};

export type UpdateEventPayload = {
  __typename?: 'updateEventPayload';
  event?: Maybe<Event>;
};

export type UpdateOrderInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditOrderInput>;
};

export type UpdateOrderPayload = {
  __typename?: 'updateOrderPayload';
  order?: Maybe<Order>;
};

export type UpdatePostInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditPostInput>;
};

export type UpdatePostPayload = {
  __typename?: 'updatePostPayload';
  post?: Maybe<Post>;
};

export type UpdateRoleInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditRoleInput>;
};

export type UpdateRolePayload = {
  __typename?: 'updateRolePayload';
  role?: Maybe<UsersPermissionsRole>;
};

export type UpdateUserInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditUserInput>;
};

export type UpdateUserPayload = {
  __typename?: 'updateUserPayload';
  user?: Maybe<UsersPermissionsUser>;
};
