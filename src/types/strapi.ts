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
  /** Input type for dynamic zone data of ProductOption */
  ProductOptionDataDynamicZoneInput: any;
  /** A time string with format: HH:mm:ss.SSS */
  Time: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AcceptedStudent = {
  __typename?: 'AcceptedStudent';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  images?: Maybe<Array<Maybe<UploadFile>>>;
  localizations?: Maybe<Array<Maybe<AcceptedStudent>>>;
};


export type AcceptedStudentImagesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type AcceptedStudentLocalizationsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type AcceptedStudentInput = {
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Maybe<Scalars['ID']>>>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
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

export type AssumedStudent = {
  __typename?: 'AssumedStudent';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  images?: Maybe<Array<Maybe<UploadFile>>>;
  localizations?: Maybe<Array<Maybe<AssumedStudent>>>;
};


export type AssumedStudentImagesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type AssumedStudentLocalizationsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type AssumedStudentInput = {
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Maybe<Scalars['ID']>>>;
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

export type Chapter = {
  __typename?: 'Chapter';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  board?: Maybe<Committee>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  images?: Maybe<Array<Maybe<UploadFile>>>;
  localizations?: Maybe<Array<Maybe<Chapter>>>;
};


export type ChapterImagesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type ChapterLocalizationsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type ChapterInput = {
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  board?: Maybe<Scalars['ID']>;
  images?: Maybe<Array<Maybe<Scalars['ID']>>>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type ChapterYear = {
  __typename?: 'ChapterYear';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  label: Scalars['String'];
  user?: Maybe<UsersPermissionsUser>;
  representative?: Maybe<Representative>;
  published_at?: Maybe<Scalars['DateTime']>;
};

export type ChapterYearAggregator = {
  __typename?: 'ChapterYearAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type ChapterYearConnection = {
  __typename?: 'ChapterYearConnection';
  values?: Maybe<Array<Maybe<ChapterYear>>>;
  groupBy?: Maybe<ChapterYearGroupBy>;
  aggregate?: Maybe<ChapterYearAggregator>;
};

export type ChapterYearConnectionCreated_At = {
  __typename?: 'ChapterYearConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<ChapterYearConnection>;
};

export type ChapterYearConnectionId = {
  __typename?: 'ChapterYearConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<ChapterYearConnection>;
};

export type ChapterYearConnectionLabel = {
  __typename?: 'ChapterYearConnectionLabel';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<ChapterYearConnection>;
};

export type ChapterYearConnectionPublished_At = {
  __typename?: 'ChapterYearConnectionPublished_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<ChapterYearConnection>;
};

export type ChapterYearConnectionRepresentative = {
  __typename?: 'ChapterYearConnectionRepresentative';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<ChapterYearConnection>;
};

export type ChapterYearConnectionUpdated_At = {
  __typename?: 'ChapterYearConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<ChapterYearConnection>;
};

export type ChapterYearConnectionUser = {
  __typename?: 'ChapterYearConnectionUser';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<ChapterYearConnection>;
};

export type ChapterYearGroupBy = {
  __typename?: 'ChapterYearGroupBy';
  id?: Maybe<Array<Maybe<ChapterYearConnectionId>>>;
  created_at?: Maybe<Array<Maybe<ChapterYearConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<ChapterYearConnectionUpdated_At>>>;
  label?: Maybe<Array<Maybe<ChapterYearConnectionLabel>>>;
  user?: Maybe<Array<Maybe<ChapterYearConnectionUser>>>;
  representative?: Maybe<Array<Maybe<ChapterYearConnectionRepresentative>>>;
  published_at?: Maybe<Array<Maybe<ChapterYearConnectionPublished_At>>>;
};

export type ChapterYearInput = {
  label: Scalars['String'];
  user?: Maybe<Scalars['ID']>;
  representative?: Maybe<Scalars['ID']>;
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
  committee_objective?: Maybe<CommitteeObjective>;
  abbreviation?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  icon?: Maybe<UploadFile>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  events?: Maybe<Array<Maybe<Event>>>;
  posts?: Maybe<Array<Maybe<Post>>>;
  representatives?: Maybe<Array<Maybe<Representative>>>;
  contacts?: Maybe<Array<Maybe<Representative>>>;
  localizations?: Maybe<Array<Maybe<Committee>>>;
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


export type CommitteeRepresentativesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type CommitteeContactsArgs = {
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

export type CommitteeConnectionAbbreviation = {
  __typename?: 'CommitteeConnectionAbbreviation';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<CommitteeConnection>;
};

export type CommitteeConnectionCommittee_Objective = {
  __typename?: 'CommitteeConnectionCommittee_objective';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<CommitteeConnection>;
};

export type CommitteeConnectionContent = {
  __typename?: 'CommitteeConnectionContent';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<CommitteeConnection>;
};

export type CommitteeConnectionCreated_At = {
  __typename?: 'CommitteeConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<CommitteeConnection>;
};

export type CommitteeConnectionIcon = {
  __typename?: 'CommitteeConnectionIcon';
  key?: Maybe<Scalars['ID']>;
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

export type CommitteeConnectionSlug = {
  __typename?: 'CommitteeConnectionSlug';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<CommitteeConnection>;
};

export type CommitteeConnectionUpdated_At = {
  __typename?: 'CommitteeConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<CommitteeConnection>;
};

export type CommitteeFunction = {
  __typename?: 'CommitteeFunction';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  role: Scalars['String'];
  abbreviation?: Maybe<Scalars['String']>;
  featured_role: Scalars['Boolean'];
  contact: Scalars['String'];
  slug: Scalars['String'];
  role_description?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  representatives?: Maybe<Array<Maybe<Representative>>>;
  committee_objectives?: Maybe<Array<Maybe<CommitteeObjective>>>;
  localizations?: Maybe<Array<Maybe<CommitteeFunction>>>;
};


export type CommitteeFunctionRepresentativesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type CommitteeFunctionCommittee_ObjectivesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type CommitteeFunctionLocalizationsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type CommitteeFunctionAggregator = {
  __typename?: 'CommitteeFunctionAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type CommitteeFunctionConnection = {
  __typename?: 'CommitteeFunctionConnection';
  values?: Maybe<Array<Maybe<CommitteeFunction>>>;
  groupBy?: Maybe<CommitteeFunctionGroupBy>;
  aggregate?: Maybe<CommitteeFunctionAggregator>;
};

export type CommitteeFunctionConnectionAbbreviation = {
  __typename?: 'CommitteeFunctionConnectionAbbreviation';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<CommitteeFunctionConnection>;
};

export type CommitteeFunctionConnectionContact = {
  __typename?: 'CommitteeFunctionConnectionContact';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<CommitteeFunctionConnection>;
};

export type CommitteeFunctionConnectionCreated_At = {
  __typename?: 'CommitteeFunctionConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<CommitteeFunctionConnection>;
};

export type CommitteeFunctionConnectionFeatured_Role = {
  __typename?: 'CommitteeFunctionConnectionFeatured_role';
  key?: Maybe<Scalars['Boolean']>;
  connection?: Maybe<CommitteeFunctionConnection>;
};

export type CommitteeFunctionConnectionId = {
  __typename?: 'CommitteeFunctionConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<CommitteeFunctionConnection>;
};

export type CommitteeFunctionConnectionLocale = {
  __typename?: 'CommitteeFunctionConnectionLocale';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<CommitteeFunctionConnection>;
};

export type CommitteeFunctionConnectionPublished_At = {
  __typename?: 'CommitteeFunctionConnectionPublished_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<CommitteeFunctionConnection>;
};

export type CommitteeFunctionConnectionRole = {
  __typename?: 'CommitteeFunctionConnectionRole';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<CommitteeFunctionConnection>;
};

export type CommitteeFunctionConnectionRole_Description = {
  __typename?: 'CommitteeFunctionConnectionRole_description';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<CommitteeFunctionConnection>;
};

export type CommitteeFunctionConnectionSlug = {
  __typename?: 'CommitteeFunctionConnectionSlug';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<CommitteeFunctionConnection>;
};

export type CommitteeFunctionConnectionUpdated_At = {
  __typename?: 'CommitteeFunctionConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<CommitteeFunctionConnection>;
};

export type CommitteeFunctionGroupBy = {
  __typename?: 'CommitteeFunctionGroupBy';
  id?: Maybe<Array<Maybe<CommitteeFunctionConnectionId>>>;
  created_at?: Maybe<Array<Maybe<CommitteeFunctionConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<CommitteeFunctionConnectionUpdated_At>>>;
  role?: Maybe<Array<Maybe<CommitteeFunctionConnectionRole>>>;
  abbreviation?: Maybe<Array<Maybe<CommitteeFunctionConnectionAbbreviation>>>;
  featured_role?: Maybe<Array<Maybe<CommitteeFunctionConnectionFeatured_Role>>>;
  contact?: Maybe<Array<Maybe<CommitteeFunctionConnectionContact>>>;
  slug?: Maybe<Array<Maybe<CommitteeFunctionConnectionSlug>>>;
  role_description?: Maybe<Array<Maybe<CommitteeFunctionConnectionRole_Description>>>;
  locale?: Maybe<Array<Maybe<CommitteeFunctionConnectionLocale>>>;
  published_at?: Maybe<Array<Maybe<CommitteeFunctionConnectionPublished_At>>>;
};

export type CommitteeFunctionInput = {
  representatives?: Maybe<Array<Maybe<Scalars['ID']>>>;
  role: Scalars['String'];
  abbreviation?: Maybe<Scalars['String']>;
  committee_objectives?: Maybe<Array<Maybe<Scalars['ID']>>>;
  featured_role?: Maybe<Scalars['Boolean']>;
  contact: Scalars['String'];
  slug: Scalars['String'];
  role_description?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type CommitteeGroupBy = {
  __typename?: 'CommitteeGroupBy';
  id?: Maybe<Array<Maybe<CommitteeConnectionId>>>;
  created_at?: Maybe<Array<Maybe<CommitteeConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<CommitteeConnectionUpdated_At>>>;
  name?: Maybe<Array<Maybe<CommitteeConnectionName>>>;
  committee_objective?: Maybe<Array<Maybe<CommitteeConnectionCommittee_Objective>>>;
  abbreviation?: Maybe<Array<Maybe<CommitteeConnectionAbbreviation>>>;
  slug?: Maybe<Array<Maybe<CommitteeConnectionSlug>>>;
  content?: Maybe<Array<Maybe<CommitteeConnectionContent>>>;
  icon?: Maybe<Array<Maybe<CommitteeConnectionIcon>>>;
  locale?: Maybe<Array<Maybe<CommitteeConnectionLocale>>>;
  published_at?: Maybe<Array<Maybe<CommitteeConnectionPublished_At>>>;
};

export type CommitteeInput = {
  name: Scalars['String'];
  events?: Maybe<Array<Maybe<Scalars['ID']>>>;
  posts?: Maybe<Array<Maybe<Scalars['ID']>>>;
  committee_objective?: Maybe<Scalars['ID']>;
  representatives?: Maybe<Array<Maybe<Scalars['ID']>>>;
  abbreviation?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['ID']>;
  contacts?: Maybe<Array<Maybe<Scalars['ID']>>>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type CommitteeLandingpage = {
  __typename?: 'CommitteeLandingpage';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  localizations?: Maybe<Array<Maybe<CommitteeLandingpage>>>;
};


export type CommitteeLandingpageLocalizationsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type CommitteeLandingpageInput = {
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type CommitteeObjective = {
  __typename?: 'CommitteeObjective';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  objective?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  committees?: Maybe<Array<Maybe<Committee>>>;
  representatives?: Maybe<Array<Maybe<Representative>>>;
  committee_roles?: Maybe<Array<Maybe<CommitteeFunction>>>;
  localizations?: Maybe<Array<Maybe<CommitteeObjective>>>;
};


export type CommitteeObjectiveCommitteesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type CommitteeObjectiveRepresentativesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type CommitteeObjectiveCommittee_RolesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type CommitteeObjectiveLocalizationsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type CommitteeObjectiveAggregator = {
  __typename?: 'CommitteeObjectiveAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type CommitteeObjectiveConnection = {
  __typename?: 'CommitteeObjectiveConnection';
  values?: Maybe<Array<Maybe<CommitteeObjective>>>;
  groupBy?: Maybe<CommitteeObjectiveGroupBy>;
  aggregate?: Maybe<CommitteeObjectiveAggregator>;
};

export type CommitteeObjectiveConnectionCreated_At = {
  __typename?: 'CommitteeObjectiveConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<CommitteeObjectiveConnection>;
};

export type CommitteeObjectiveConnectionId = {
  __typename?: 'CommitteeObjectiveConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<CommitteeObjectiveConnection>;
};

export type CommitteeObjectiveConnectionLocale = {
  __typename?: 'CommitteeObjectiveConnectionLocale';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<CommitteeObjectiveConnection>;
};

export type CommitteeObjectiveConnectionObjective = {
  __typename?: 'CommitteeObjectiveConnectionObjective';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<CommitteeObjectiveConnection>;
};

export type CommitteeObjectiveConnectionUpdated_At = {
  __typename?: 'CommitteeObjectiveConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<CommitteeObjectiveConnection>;
};

export type CommitteeObjectiveGroupBy = {
  __typename?: 'CommitteeObjectiveGroupBy';
  id?: Maybe<Array<Maybe<CommitteeObjectiveConnectionId>>>;
  created_at?: Maybe<Array<Maybe<CommitteeObjectiveConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<CommitteeObjectiveConnectionUpdated_At>>>;
  objective?: Maybe<Array<Maybe<CommitteeObjectiveConnectionObjective>>>;
  locale?: Maybe<Array<Maybe<CommitteeObjectiveConnectionLocale>>>;
};

export type CommitteeObjectiveInput = {
  committees?: Maybe<Array<Maybe<Scalars['ID']>>>;
  representatives?: Maybe<Array<Maybe<Scalars['ID']>>>;
  objective?: Maybe<Scalars['String']>;
  committee_roles?: Maybe<Array<Maybe<Scalars['ID']>>>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type Company = {
  __typename?: 'Company';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  name: Scalars['String'];
  logo?: Maybe<UploadFile>;
  website?: Maybe<Scalars['String']>;
  backgroundColor?: Maybe<Enum_Company_Backgroundcolor>;
  sponsor?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  jobs?: Maybe<Array<Maybe<Jobs>>>;
  localizations?: Maybe<Array<Maybe<Company>>>;
};


export type CompanyJobsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type CompanyLocalizationsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type CompanyAggregator = {
  __typename?: 'CompanyAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type CompanyConnection = {
  __typename?: 'CompanyConnection';
  values?: Maybe<Array<Maybe<Company>>>;
  groupBy?: Maybe<CompanyGroupBy>;
  aggregate?: Maybe<CompanyAggregator>;
};

export type CompanyConnectionBackgroundColor = {
  __typename?: 'CompanyConnectionBackgroundColor';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<CompanyConnection>;
};

export type CompanyConnectionCreated_At = {
  __typename?: 'CompanyConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<CompanyConnection>;
};

export type CompanyConnectionId = {
  __typename?: 'CompanyConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<CompanyConnection>;
};

export type CompanyConnectionLocale = {
  __typename?: 'CompanyConnectionLocale';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<CompanyConnection>;
};

export type CompanyConnectionLogo = {
  __typename?: 'CompanyConnectionLogo';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<CompanyConnection>;
};

export type CompanyConnectionName = {
  __typename?: 'CompanyConnectionName';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<CompanyConnection>;
};

export type CompanyConnectionPublished_At = {
  __typename?: 'CompanyConnectionPublished_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<CompanyConnection>;
};

export type CompanyConnectionSponsor = {
  __typename?: 'CompanyConnectionSponsor';
  key?: Maybe<Scalars['Boolean']>;
  connection?: Maybe<CompanyConnection>;
};

export type CompanyConnectionUpdated_At = {
  __typename?: 'CompanyConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<CompanyConnection>;
};

export type CompanyConnectionWebsite = {
  __typename?: 'CompanyConnectionWebsite';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<CompanyConnection>;
};

export type CompanyGroupBy = {
  __typename?: 'CompanyGroupBy';
  id?: Maybe<Array<Maybe<CompanyConnectionId>>>;
  created_at?: Maybe<Array<Maybe<CompanyConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<CompanyConnectionUpdated_At>>>;
  name?: Maybe<Array<Maybe<CompanyConnectionName>>>;
  logo?: Maybe<Array<Maybe<CompanyConnectionLogo>>>;
  website?: Maybe<Array<Maybe<CompanyConnectionWebsite>>>;
  backgroundColor?: Maybe<Array<Maybe<CompanyConnectionBackgroundColor>>>;
  sponsor?: Maybe<Array<Maybe<CompanyConnectionSponsor>>>;
  locale?: Maybe<Array<Maybe<CompanyConnectionLocale>>>;
  published_at?: Maybe<Array<Maybe<CompanyConnectionPublished_At>>>;
};

export type CompanyInput = {
  name: Scalars['String'];
  logo?: Maybe<Scalars['ID']>;
  jobs?: Maybe<Array<Maybe<Scalars['ID']>>>;
  website?: Maybe<Scalars['String']>;
  backgroundColor?: Maybe<Enum_Company_Backgroundcolor>;
  sponsor?: Maybe<Scalars['Boolean']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type ComponentDocumentDocumentInput = {
  name: Scalars['String'];
  date: Scalars['Date'];
  category?: Maybe<Scalars['ID']>;
  file?: Maybe<Scalars['ID']>;
  archived?: Maybe<Scalars['Boolean']>;
  current?: Maybe<Scalars['Boolean']>;
  businessYear?: Maybe<Scalars['String']>;
};

export type ComponentDocumentDocuments = {
  __typename?: 'ComponentDocumentDocuments';
  id: Scalars['ID'];
  name: Scalars['String'];
  date: Scalars['Date'];
  category?: Maybe<DocumentCategory>;
  file?: Maybe<UploadFile>;
  archived: Scalars['Boolean'];
  current: Scalars['Boolean'];
  businessYear?: Maybe<Scalars['String']>;
};

export type ComponentEventFormInput = {
  __typename?: 'ComponentEventFormInput';
  id: Scalars['ID'];
  label: Scalars['String'];
  required: Scalars['Boolean'];
  description: Scalars['String'];
  placeholder?: Maybe<Scalars['String']>;
  regex?: Maybe<Scalars['String']>;
};

export type ComponentEventFormInputInput = {
  label: Scalars['String'];
  required?: Maybe<Scalars['Boolean']>;
  description: Scalars['String'];
  placeholder?: Maybe<Scalars['String']>;
  regex?: Maybe<Scalars['String']>;
};

export type ComponentEventFormOption = {
  __typename?: 'ComponentEventFormOption';
  id: Scalars['ID'];
  label: Scalars['String'];
  value: Scalars['String'];
};

export type ComponentEventFormOptionInput = {
  label: Scalars['String'];
  value: Scalars['String'];
};

export type ComponentEventFormSelect = {
  __typename?: 'ComponentEventFormSelect';
  id: Scalars['ID'];
  label: Scalars['String'];
  required: Scalars['Boolean'];
  description: Scalars['String'];
  meta_option?: Maybe<MetaOption>;
};

export type ComponentEventFormSelectInput = {
  label: Scalars['String'];
  required?: Maybe<Scalars['Boolean']>;
  description: Scalars['String'];
  meta_option?: Maybe<Scalars['ID']>;
};

export type ComponentEventFormSwitch = {
  __typename?: 'ComponentEventFormSwitch';
  id: Scalars['ID'];
  label: Scalars['String'];
  required: Scalars['Boolean'];
  description?: Maybe<Scalars['String']>;
};

export type ComponentEventFormSwitchInput = {
  label: Scalars['String'];
  required?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
};

export type ComponentEventInternalDeadline = {
  __typename?: 'ComponentEventInternalDeadline';
  id: Scalars['ID'];
  datetime: Scalars['DateTime'];
};

export type ComponentEventInternalDeadlineInput = {
  datetime: Scalars['DateTime'];
};

export type ComponentEventInternalDietPreference = {
  __typename?: 'ComponentEventInternalDietPreference';
  id: Scalars['ID'];
  diets?: Maybe<Array<Maybe<Diet>>>;
};


export type ComponentEventInternalDietPreferenceDietsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type ComponentEventInternalDietPreferenceInput = {
  diets?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type ComponentEventInternalEndTime = {
  __typename?: 'ComponentEventInternalEndTime';
  id: Scalars['ID'];
  datetime: Scalars['DateTime'];
};

export type ComponentEventInternalEndTimeInput = {
  datetime: Scalars['DateTime'];
};

export type ComponentEventInternalExtraOptionInput = {
  _?: Maybe<Scalars['String']>;
};

export type ComponentEventInternalExtraOptions = {
  __typename?: 'ComponentEventInternalExtraOptions';
  id: Scalars['ID'];
};

export type ComponentEventInternalOptionInput = {
  label: Scalars['String'];
  value: Scalars['String'];
};

export type ComponentEventInternalOptions = {
  __typename?: 'ComponentEventInternalOptions';
  id: Scalars['ID'];
  label: Scalars['String'];
  value: Scalars['String'];
};

export type ComponentEventInternalOrderOption = {
  __typename?: 'ComponentEventInternalOrderOption';
  id: Scalars['ID'];
  data: Scalars['JSON'];
};

export type ComponentEventInternalOrderOptionInput = {
  data: Scalars['JSON'];
};

export type ComponentEventInternalSchedule = {
  __typename?: 'ComponentEventInternalSchedule';
  id: Scalars['ID'];
};

export type ComponentEventInternalScheduleInput = {
  _?: Maybe<Scalars['String']>;
};

export type ComponentEventInternalStartTime = {
  __typename?: 'ComponentEventInternalStartTime';
  id: Scalars['ID'];
  datetime: Scalars['DateTime'];
};

export type ComponentEventInternalStartTimeInput = {
  datetime: Scalars['DateTime'];
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
  swedishName?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  ticketUID?: Maybe<Scalars['String']>;
  englishName?: Maybe<Scalars['String']>;
};

export type ComponentEventInternalTicketInput = {
  swedishName?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  ticketUID?: Maybe<Scalars['String']>;
  englishName?: Maybe<Scalars['String']>;
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
};

export type ComponentEventPlaceInput = {
  name: Scalars['String'];
};

export type ComponentEventRecipient = {
  __typename?: 'ComponentEventRecipient';
  id: Scalars['ID'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  allergens?: Maybe<Array<Maybe<Allergy>>>;
  diets?: Maybe<Array<Maybe<Diet>>>;
};


export type ComponentEventRecipientAllergensArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type ComponentEventRecipientDietsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type ComponentEventRecipientInput = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  allergens?: Maybe<Array<Maybe<Scalars['ID']>>>;
  diets?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type ComponentEventSchedule = {
  __typename?: 'ComponentEventSchedule';
  id: Scalars['ID'];
  start: Scalars['DateTime'];
  end: Scalars['DateTime'];
  deadline: Scalars['DateTime'];
};

export type ComponentEventScheduleInput = {
  start: Scalars['DateTime'];
  end: Scalars['DateTime'];
  deadline: Scalars['DateTime'];
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
  uid?: Maybe<Scalars['String']>;
};

export type ComponentEventTicketReferenceInput = {
  reference?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  uid?: Maybe<Scalars['String']>;
};

export type ComponentEventTickets = {
  __typename?: 'ComponentEventTickets';
  id: Scalars['ID'];
  Tickets?: Maybe<Array<Maybe<ComponentEventInternalTicket>>>;
  allowMultiple?: Maybe<Scalars['Boolean']>;
};

export type ComponentFooterSocial = {
  __typename?: 'ComponentFooterSocial';
  id: Scalars['ID'];
  type: Enum_Componentfootersocial_Type;
  href?: Maybe<Scalars['String']>;
};

export type ComponentFooterSocialInput = {
  type: Enum_Componentfootersocial_Type;
  href?: Maybe<Scalars['String']>;
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

export type ComponentHeaderContact = {
  __typename?: 'ComponentHeaderContact';
  id: Scalars['ID'];
  label: Scalars['String'];
  href: Scalars['String'];
};

export type ComponentHeaderContactInput = {
  label: Scalars['String'];
  href: Scalars['String'];
};

export type ComponentHeaderFeedbackbox = {
  __typename?: 'ComponentHeaderFeedbackbox';
  id: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
};

export type ComponentHeaderFeedbackboxInput = {
  description?: Maybe<Scalars['String']>;
};

export type ComponentHeaderLanguageInput = {
  label: Scalars['String'];
  code?: Maybe<Scalars['String']>;
};

export type ComponentHeaderLanguages = {
  __typename?: 'ComponentHeaderLanguages';
  id: Scalars['ID'];
  label: Scalars['String'];
  code?: Maybe<Scalars['String']>;
};

export type ComponentHeaderLogo = {
  __typename?: 'ComponentHeaderLogo';
  id: Scalars['ID'];
  alternative?: Maybe<Scalars['String']>;
  src?: Maybe<UploadFile>;
};

export type ComponentHeaderLogoInput = {
  alternative?: Maybe<Scalars['String']>;
  src?: Maybe<Scalars['ID']>;
};

export type ComponentHeaderMenuSection = {
  __typename?: 'ComponentHeaderMenuSection';
  id: Scalars['ID'];
  label: Scalars['String'];
  href: Scalars['String'];
  subSection?: Maybe<Array<Maybe<ComponentHeaderSubSection>>>;
  displayDropDown: Scalars['Boolean'];
};

export type ComponentHeaderMenuSectionInput = {
  label: Scalars['String'];
  href: Scalars['String'];
  subSection?: Maybe<Array<Maybe<ComponentHeaderSubSectionInput>>>;
  displayDropDown?: Maybe<Scalars['Boolean']>;
};

export type ComponentHeaderSubSection = {
  __typename?: 'ComponentHeaderSubSection';
  id: Scalars['ID'];
  label: Scalars['String'];
  href: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  icon: Enum_Componentheadersubsection_Icon;
  color: Enum_Componentheadersubsection_Color;
};

export type ComponentHeaderSubSectionInput = {
  label: Scalars['String'];
  href: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  icon?: Maybe<Enum_Componentheadersubsection_Icon>;
  color?: Maybe<Enum_Componentheadersubsection_Color>;
};

export type ComponentJobAbout = {
  __typename?: 'ComponentJobAbout';
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
};

export type ComponentJobAboutInput = {
  title?: Maybe<Scalars['String']>;
  description: Scalars['String'];
};

export type ComponentJobContact = {
  __typename?: 'ComponentJobContact';
  id: Scalars['ID'];
  label?: Maybe<Scalars['String']>;
  type: Enum_Componentjobcontact_Type;
  href: Scalars['String'];
};

export type ComponentJobContactInput = {
  label?: Maybe<Scalars['String']>;
  type?: Maybe<Enum_Componentjobcontact_Type>;
  href: Scalars['String'];
};

export type ComponentJobDescription = {
  __typename?: 'ComponentJobDescription';
  id: Scalars['ID'];
  description: Scalars['String'];
};

export type ComponentJobDescriptionInput = {
  description: Scalars['String'];
};

export type ComponentJobImage = {
  __typename?: 'ComponentJobImage';
  id: Scalars['ID'];
  image?: Maybe<UploadFile>;
};

export type ComponentJobImageInput = {
  image?: Maybe<Scalars['ID']>;
};

export type ComponentJobMail = {
  __typename?: 'ComponentJobMail';
  id: Scalars['ID'];
  email?: Maybe<Scalars['String']>;
  label: Scalars['String'];
};

export type ComponentJobMailInput = {
  email?: Maybe<Scalars['String']>;
  label: Scalars['String'];
};

export type ComponentJobRequirementInput = {
  title?: Maybe<Scalars['String']>;
  requirements?: Maybe<Array<ComponentJobTaskItemInput>>;
};

export type ComponentJobRequirements = {
  __typename?: 'ComponentJobRequirements';
  id: Scalars['ID'];
  title: Scalars['String'];
  requirements?: Maybe<Array<Maybe<ComponentJobTaskItem>>>;
};

export type ComponentJobTaskInput = {
  title?: Maybe<Scalars['String']>;
  taskItem?: Maybe<Array<Maybe<ComponentJobTaskItemInput>>>;
  description?: Maybe<Scalars['String']>;
};

export type ComponentJobTaskItem = {
  __typename?: 'ComponentJobTaskItem';
  id: Scalars['ID'];
};

export type ComponentJobTaskItemInput = {
  _?: Maybe<Scalars['String']>;
};

export type ComponentJobTasks = {
  __typename?: 'ComponentJobTasks';
  id: Scalars['ID'];
  title: Scalars['String'];
  taskItem?: Maybe<Array<Maybe<ComponentJobTaskItem>>>;
  description?: Maybe<Scalars['String']>;
};

export type ComponentJobYear = {
  __typename?: 'ComponentJobYear';
  id: Scalars['ID'];
  year: Enum_Componentjobyear_Year;
};

export type ComponentJobYearInput = {
  year: Enum_Componentjobyear_Year;
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

export type Document = {
  __typename?: 'Document';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  document?: Maybe<Array<Maybe<ComponentDocumentDocuments>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  localizations?: Maybe<Array<Maybe<Document>>>;
};


export type DocumentLocalizationsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type DocumentCategory = {
  __typename?: 'DocumentCategory';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  name?: Maybe<Scalars['String']>;
  relatedTo?: Maybe<DocumentCategory>;
  locale?: Maybe<Scalars['String']>;
  relatedCategories?: Maybe<Array<Maybe<DocumentCategory>>>;
  localizations?: Maybe<Array<Maybe<DocumentCategory>>>;
};


export type DocumentCategoryRelatedCategoriesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type DocumentCategoryLocalizationsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type DocumentCategoryAggregator = {
  __typename?: 'DocumentCategoryAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type DocumentCategoryConnection = {
  __typename?: 'DocumentCategoryConnection';
  values?: Maybe<Array<Maybe<DocumentCategory>>>;
  groupBy?: Maybe<DocumentCategoryGroupBy>;
  aggregate?: Maybe<DocumentCategoryAggregator>;
};

export type DocumentCategoryConnectionCreated_At = {
  __typename?: 'DocumentCategoryConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<DocumentCategoryConnection>;
};

export type DocumentCategoryConnectionId = {
  __typename?: 'DocumentCategoryConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<DocumentCategoryConnection>;
};

export type DocumentCategoryConnectionLocale = {
  __typename?: 'DocumentCategoryConnectionLocale';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<DocumentCategoryConnection>;
};

export type DocumentCategoryConnectionName = {
  __typename?: 'DocumentCategoryConnectionName';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<DocumentCategoryConnection>;
};

export type DocumentCategoryConnectionRelatedTo = {
  __typename?: 'DocumentCategoryConnectionRelatedTo';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<DocumentCategoryConnection>;
};

export type DocumentCategoryConnectionUpdated_At = {
  __typename?: 'DocumentCategoryConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<DocumentCategoryConnection>;
};

export type DocumentCategoryGroupBy = {
  __typename?: 'DocumentCategoryGroupBy';
  id?: Maybe<Array<Maybe<DocumentCategoryConnectionId>>>;
  created_at?: Maybe<Array<Maybe<DocumentCategoryConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<DocumentCategoryConnectionUpdated_At>>>;
  name?: Maybe<Array<Maybe<DocumentCategoryConnectionName>>>;
  relatedTo?: Maybe<Array<Maybe<DocumentCategoryConnectionRelatedTo>>>;
  locale?: Maybe<Array<Maybe<DocumentCategoryConnectionLocale>>>;
};

export type DocumentCategoryInput = {
  name?: Maybe<Scalars['String']>;
  relatedCategories?: Maybe<Array<Maybe<Scalars['ID']>>>;
  relatedTo?: Maybe<Scalars['ID']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type DocumentInput = {
  document?: Maybe<Array<Maybe<ComponentDocumentDocumentInput>>>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export enum Enum_Company_Backgroundcolor {
  Black = 'black',
  White = 'white',
  Porterbrun = 'porterbrun'
}

export enum Enum_Componentfootersocial_Type {
  Facebook = 'FACEBOOK',
  Instagram = 'INSTAGRAM',
  Linkedin = 'LINKEDIN',
  Discord = 'DISCORD'
}

export enum Enum_Componentheadersubsection_Color {
  Black = 'black',
  White = 'white',
  Gray = 'gray',
  Red = 'red',
  Orange = 'orange',
  Yellow = 'yellow',
  Green = 'green',
  Teal = 'teal',
  Blue = 'blue',
  Cyan = 'cyan',
  Purple = 'purple',
  Pink = 'pink'
}

export enum Enum_Componentheadersubsection_Icon {
  Gavel = 'gavel',
  Group = 'group',
  Atlas = 'atlas',
  Colorlens = 'colorlens',
  Car = 'car',
  Question = 'question',
  University = 'university',
  Microphone = 'microphone',
  Beer = 'beer',
  Work = 'work',
  Workshop = 'workshop'
}

export enum Enum_Componentjobcontact_Type {
  Email = 'email',
  Website = 'website',
  Phone = 'phone',
  Cta = 'cta'
}

export enum Enum_Componentjobyear_Year {
  YearOne = 'YEAR_ONE',
  YearTwo = 'YEAR_TWO',
  YearThree = 'YEAR_THREE',
  YearFour = 'YEAR_FOUR',
  YearFive = 'YEAR_FIVE'
}

export type EmailDesignerEmailTemplate = {
  __typename?: 'EmailDesignerEmailTemplate';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  design?: Maybe<Scalars['JSON']>;
  name?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
  bodyHtml?: Maybe<Scalars['String']>;
  bodyText?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
  tags?: Maybe<Scalars['JSON']>;
};

export type EmailTemplateInput = {
  design?: Maybe<Scalars['JSON']>;
  name?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
  bodyHtml?: Maybe<Scalars['String']>;
  bodyText?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
  tags?: Maybe<Scalars['JSON']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type Event = {
  __typename?: 'Event';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  title: Scalars['String'];
  slug?: Maybe<Scalars['String']>;
  committee?: Maybe<Committee>;
  category?: Maybe<EventCategory>;
  body: Scalars['String'];
  public: Scalars['Boolean'];
  password?: Maybe<Scalars['String']>;
  schedule?: Maybe<ComponentEventSchedule>;
  location: Scalars['String'];
  description: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  media?: Maybe<Array<Maybe<UploadFile>>>;
  products?: Maybe<Array<Maybe<Product>>>;
  localizations?: Maybe<Array<Maybe<Event>>>;
};


export type EventMediaArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type EventProductsArgs = {
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

export type EventConnectionBody = {
  __typename?: 'EventConnectionBody';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<EventConnection>;
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

export type EventConnectionDescription = {
  __typename?: 'EventConnectionDescription';
  key?: Maybe<Scalars['String']>;
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

export type EventConnectionLocation = {
  __typename?: 'EventConnectionLocation';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<EventConnection>;
};

export type EventConnectionPassword = {
  __typename?: 'EventConnectionPassword';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<EventConnection>;
};

export type EventConnectionPublic = {
  __typename?: 'EventConnectionPublic';
  key?: Maybe<Scalars['Boolean']>;
  connection?: Maybe<EventConnection>;
};

export type EventConnectionPublished_At = {
  __typename?: 'EventConnectionPublished_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<EventConnection>;
};

export type EventConnectionSchedule = {
  __typename?: 'EventConnectionSchedule';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<EventConnection>;
};

export type EventConnectionSlug = {
  __typename?: 'EventConnectionSlug';
  key?: Maybe<Scalars['String']>;
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
  body?: Maybe<Array<Maybe<EventConnectionBody>>>;
  public?: Maybe<Array<Maybe<EventConnectionPublic>>>;
  password?: Maybe<Array<Maybe<EventConnectionPassword>>>;
  schedule?: Maybe<Array<Maybe<EventConnectionSchedule>>>;
  location?: Maybe<Array<Maybe<EventConnectionLocation>>>;
  description?: Maybe<Array<Maybe<EventConnectionDescription>>>;
  locale?: Maybe<Array<Maybe<EventConnectionLocale>>>;
  published_at?: Maybe<Array<Maybe<EventConnectionPublished_At>>>;
};

export type EventInput = {
  title: Scalars['String'];
  slug?: Maybe<Scalars['String']>;
  committee?: Maybe<Scalars['ID']>;
  category?: Maybe<Scalars['ID']>;
  body: Scalars['String'];
  media?: Maybe<Array<Maybe<Scalars['ID']>>>;
  public?: Maybe<Scalars['Boolean']>;
  password?: Maybe<Scalars['String']>;
  products?: Maybe<Array<Maybe<Scalars['ID']>>>;
  schedule?: Maybe<ComponentEventScheduleInput>;
  location: Scalars['String'];
  description: Scalars['String'];
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type Feedback = {
  __typename?: 'Feedback';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  emotion?: Maybe<Scalars['String']>;
  content: Scalars['String'];
  publishable?: Maybe<Scalars['Boolean']>;
  published_at?: Maybe<Scalars['DateTime']>;
};

export type FeedbackAggregator = {
  __typename?: 'FeedbackAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type FeedbackConnection = {
  __typename?: 'FeedbackConnection';
  values?: Maybe<Array<Maybe<Feedback>>>;
  groupBy?: Maybe<FeedbackGroupBy>;
  aggregate?: Maybe<FeedbackAggregator>;
};

export type FeedbackConnectionContent = {
  __typename?: 'FeedbackConnectionContent';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<FeedbackConnection>;
};

export type FeedbackConnectionCreated_At = {
  __typename?: 'FeedbackConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<FeedbackConnection>;
};

export type FeedbackConnectionEmotion = {
  __typename?: 'FeedbackConnectionEmotion';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<FeedbackConnection>;
};

export type FeedbackConnectionId = {
  __typename?: 'FeedbackConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<FeedbackConnection>;
};

export type FeedbackConnectionPublishable = {
  __typename?: 'FeedbackConnectionPublishable';
  key?: Maybe<Scalars['Boolean']>;
  connection?: Maybe<FeedbackConnection>;
};

export type FeedbackConnectionPublished_At = {
  __typename?: 'FeedbackConnectionPublished_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<FeedbackConnection>;
};

export type FeedbackConnectionUpdated_At = {
  __typename?: 'FeedbackConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<FeedbackConnection>;
};

export type FeedbackGroupBy = {
  __typename?: 'FeedbackGroupBy';
  id?: Maybe<Array<Maybe<FeedbackConnectionId>>>;
  created_at?: Maybe<Array<Maybe<FeedbackConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<FeedbackConnectionUpdated_At>>>;
  emotion?: Maybe<Array<Maybe<FeedbackConnectionEmotion>>>;
  content?: Maybe<Array<Maybe<FeedbackConnectionContent>>>;
  publishable?: Maybe<Array<Maybe<FeedbackConnectionPublishable>>>;
  published_at?: Maybe<Array<Maybe<FeedbackConnectionPublished_At>>>;
};

export type FeedbackInput = {
  emotion?: Maybe<Scalars['String']>;
  content: Scalars['String'];
  publishable?: Maybe<Scalars['Boolean']>;
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

export type Footer = {
  __typename?: 'Footer';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  representative?: Maybe<Representative>;
  social?: Maybe<Array<Maybe<ComponentFooterSocial>>>;
  logo?: Maybe<UploadFile>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Footer>>>;
};


export type FooterLocalizationsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type FooterInput = {
  representative?: Maybe<Scalars['ID']>;
  social?: Maybe<Array<Maybe<ComponentFooterSocialInput>>>;
  logo?: Maybe<Scalars['ID']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type Header = {
  __typename?: 'Header';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  sections?: Maybe<Array<Maybe<ComponentHeaderMenuSection>>>;
  languages?: Maybe<Array<Maybe<ComponentHeaderLanguages>>>;
  contact?: Maybe<ComponentHeaderContact>;
  logo?: Maybe<UploadFile>;
  feedbackbox?: Maybe<ComponentHeaderFeedbackbox>;
  locale?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Header>>>;
};


export type HeaderLocalizationsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type HeaderInput = {
  sections?: Maybe<Array<Maybe<ComponentHeaderMenuSectionInput>>>;
  languages?: Maybe<Array<ComponentHeaderLanguageInput>>;
  contact: ComponentHeaderContactInput;
  logo?: Maybe<Scalars['ID']>;
  feedbackbox?: Maybe<ComponentHeaderFeedbackboxInput>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
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


export type JobCategory = {
  __typename?: 'JobCategory';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  name?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  jobs?: Maybe<Array<Maybe<Jobs>>>;
  localizations?: Maybe<Array<Maybe<JobCategory>>>;
};


export type JobCategoryJobsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type JobCategoryLocalizationsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type JobCategoryAggregator = {
  __typename?: 'JobCategoryAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type JobCategoryConnection = {
  __typename?: 'JobCategoryConnection';
  values?: Maybe<Array<Maybe<JobCategory>>>;
  groupBy?: Maybe<JobCategoryGroupBy>;
  aggregate?: Maybe<JobCategoryAggregator>;
};

export type JobCategoryConnectionCreated_At = {
  __typename?: 'JobCategoryConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<JobCategoryConnection>;
};

export type JobCategoryConnectionId = {
  __typename?: 'JobCategoryConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<JobCategoryConnection>;
};

export type JobCategoryConnectionLocale = {
  __typename?: 'JobCategoryConnectionLocale';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<JobCategoryConnection>;
};

export type JobCategoryConnectionName = {
  __typename?: 'JobCategoryConnectionName';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<JobCategoryConnection>;
};

export type JobCategoryConnectionPublished_At = {
  __typename?: 'JobCategoryConnectionPublished_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<JobCategoryConnection>;
};

export type JobCategoryConnectionUpdated_At = {
  __typename?: 'JobCategoryConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<JobCategoryConnection>;
};

export type JobCategoryGroupBy = {
  __typename?: 'JobCategoryGroupBy';
  id?: Maybe<Array<Maybe<JobCategoryConnectionId>>>;
  created_at?: Maybe<Array<Maybe<JobCategoryConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<JobCategoryConnectionUpdated_At>>>;
  name?: Maybe<Array<Maybe<JobCategoryConnectionName>>>;
  locale?: Maybe<Array<Maybe<JobCategoryConnectionLocale>>>;
  published_at?: Maybe<Array<Maybe<JobCategoryConnectionPublished_At>>>;
};

export type JobCategoryInput = {
  name?: Maybe<Scalars['String']>;
  jobs?: Maybe<Array<Maybe<Scalars['ID']>>>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type JobInput = {
  title: Scalars['String'];
  slug?: Maybe<Scalars['String']>;
  deadlineDate?: Maybe<Scalars['DateTime']>;
  startDate?: Maybe<Scalars['DateTime']>;
  jobCategory?: Maybe<Scalars['ID']>;
  company?: Maybe<Scalars['ID']>;
  year?: Maybe<Array<Maybe<ComponentJobYearInput>>>;
  body: Scalars['String'];
  contact?: Maybe<Array<Maybe<ComponentJobContactInput>>>;
  position?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  banner?: Maybe<Scalars['ID']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type Jobs = {
  __typename?: 'Jobs';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  title: Scalars['String'];
  slug?: Maybe<Scalars['String']>;
  deadlineDate?: Maybe<Scalars['DateTime']>;
  startDate?: Maybe<Scalars['DateTime']>;
  jobCategory?: Maybe<JobCategory>;
  company?: Maybe<Company>;
  year?: Maybe<Array<Maybe<ComponentJobYear>>>;
  body: Scalars['String'];
  contact?: Maybe<Array<Maybe<ComponentJobContact>>>;
  position?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  banner?: Maybe<UploadFile>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  localizations?: Maybe<Array<Maybe<Jobs>>>;
};


export type JobsLocalizationsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type JobsAggregator = {
  __typename?: 'JobsAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type JobsConnection = {
  __typename?: 'JobsConnection';
  values?: Maybe<Array<Maybe<Jobs>>>;
  groupBy?: Maybe<JobsGroupBy>;
  aggregate?: Maybe<JobsAggregator>;
};

export type JobsConnectionBanner = {
  __typename?: 'JobsConnectionBanner';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<JobsConnection>;
};

export type JobsConnectionBody = {
  __typename?: 'JobsConnectionBody';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<JobsConnection>;
};

export type JobsConnectionCompany = {
  __typename?: 'JobsConnectionCompany';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<JobsConnection>;
};

export type JobsConnectionCreated_At = {
  __typename?: 'JobsConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<JobsConnection>;
};

export type JobsConnectionDeadlineDate = {
  __typename?: 'JobsConnectionDeadlineDate';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<JobsConnection>;
};

export type JobsConnectionDescription = {
  __typename?: 'JobsConnectionDescription';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<JobsConnection>;
};

export type JobsConnectionId = {
  __typename?: 'JobsConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<JobsConnection>;
};

export type JobsConnectionJobCategory = {
  __typename?: 'JobsConnectionJobCategory';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<JobsConnection>;
};

export type JobsConnectionLocale = {
  __typename?: 'JobsConnectionLocale';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<JobsConnection>;
};

export type JobsConnectionLocation = {
  __typename?: 'JobsConnectionLocation';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<JobsConnection>;
};

export type JobsConnectionPosition = {
  __typename?: 'JobsConnectionPosition';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<JobsConnection>;
};

export type JobsConnectionPublished_At = {
  __typename?: 'JobsConnectionPublished_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<JobsConnection>;
};

export type JobsConnectionSlug = {
  __typename?: 'JobsConnectionSlug';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<JobsConnection>;
};

export type JobsConnectionStartDate = {
  __typename?: 'JobsConnectionStartDate';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<JobsConnection>;
};

export type JobsConnectionTitle = {
  __typename?: 'JobsConnectionTitle';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<JobsConnection>;
};

export type JobsConnectionUpdated_At = {
  __typename?: 'JobsConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<JobsConnection>;
};

export type JobsGroupBy = {
  __typename?: 'JobsGroupBy';
  id?: Maybe<Array<Maybe<JobsConnectionId>>>;
  created_at?: Maybe<Array<Maybe<JobsConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<JobsConnectionUpdated_At>>>;
  title?: Maybe<Array<Maybe<JobsConnectionTitle>>>;
  slug?: Maybe<Array<Maybe<JobsConnectionSlug>>>;
  deadlineDate?: Maybe<Array<Maybe<JobsConnectionDeadlineDate>>>;
  startDate?: Maybe<Array<Maybe<JobsConnectionStartDate>>>;
  jobCategory?: Maybe<Array<Maybe<JobsConnectionJobCategory>>>;
  company?: Maybe<Array<Maybe<JobsConnectionCompany>>>;
  body?: Maybe<Array<Maybe<JobsConnectionBody>>>;
  position?: Maybe<Array<Maybe<JobsConnectionPosition>>>;
  location?: Maybe<Array<Maybe<JobsConnectionLocation>>>;
  description?: Maybe<Array<Maybe<JobsConnectionDescription>>>;
  banner?: Maybe<Array<Maybe<JobsConnectionBanner>>>;
  locale?: Maybe<Array<Maybe<JobsConnectionLocale>>>;
  published_at?: Maybe<Array<Maybe<JobsConnectionPublished_At>>>;
};

export type LocaleInput = {
  name?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};


export type MetaOption = {
  __typename?: 'MetaOption';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  name: Scalars['String'];
  option?: Maybe<Array<Maybe<ComponentEventFormOption>>>;
};

export type MetaOptionAggregator = {
  __typename?: 'MetaOptionAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type MetaOptionConnection = {
  __typename?: 'MetaOptionConnection';
  values?: Maybe<Array<Maybe<MetaOption>>>;
  groupBy?: Maybe<MetaOptionGroupBy>;
  aggregate?: Maybe<MetaOptionAggregator>;
};

export type MetaOptionConnectionCreated_At = {
  __typename?: 'MetaOptionConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<MetaOptionConnection>;
};

export type MetaOptionConnectionId = {
  __typename?: 'MetaOptionConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<MetaOptionConnection>;
};

export type MetaOptionConnectionName = {
  __typename?: 'MetaOptionConnectionName';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<MetaOptionConnection>;
};

export type MetaOptionConnectionUpdated_At = {
  __typename?: 'MetaOptionConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<MetaOptionConnection>;
};

export type MetaOptionGroupBy = {
  __typename?: 'MetaOptionGroupBy';
  id?: Maybe<Array<Maybe<MetaOptionConnectionId>>>;
  created_at?: Maybe<Array<Maybe<MetaOptionConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<MetaOptionConnectionUpdated_At>>>;
  name?: Maybe<Array<Maybe<MetaOptionConnectionName>>>;
};

export type MetaOptionInput = {
  name: Scalars['String'];
  option?: Maybe<Array<Maybe<ComponentEventFormOptionInput>>>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type Morph = UsersPermissionsMe | UsersPermissionsMeRole | UsersPermissionsLoginPayload | UserPermissionsPasswordPayload | AcceptedStudent | UpdateAcceptedStudentPayload | DeleteAcceptedStudentPayload | Allergy | AllergyConnection | AllergyAggregator | AllergyAggregatorSum | AllergyAggregatorAvg | AllergyAggregatorMin | AllergyAggregatorMax | AllergyGroupBy | AllergyConnectionId | AllergyConnectionCreated_At | AllergyConnectionUpdated_At | AllergyConnectionName | AllergyConnectionCount | AllergyConnectionLocale | AllergyConnectionPublished_At | CreateAllergyPayload | UpdateAllergyPayload | DeleteAllergyPayload | AssumedStudent | UpdateAssumedStudentPayload | DeleteAssumedStudentPayload | Category | CategoryConnection | CategoryAggregator | CategoryGroupBy | CategoryConnectionId | CategoryConnectionCreated_At | CategoryConnectionUpdated_At | CategoryConnectionName | CategoryConnectionLocale | CategoryConnectionPublished_At | CreateCategoryPayload | UpdateCategoryPayload | DeleteCategoryPayload | ChapterYear | ChapterYearConnection | ChapterYearAggregator | ChapterYearGroupBy | ChapterYearConnectionId | ChapterYearConnectionCreated_At | ChapterYearConnectionUpdated_At | ChapterYearConnectionLabel | ChapterYearConnectionUser | ChapterYearConnectionRepresentative | ChapterYearConnectionPublished_At | CreateChapterYearPayload | UpdateChapterYearPayload | DeleteChapterYearPayload | Chapter | UpdateChapterPayload | DeleteChapterPayload | CommitteeFunction | CommitteeFunctionConnection | CommitteeFunctionAggregator | CommitteeFunctionGroupBy | CommitteeFunctionConnectionId | CommitteeFunctionConnectionCreated_At | CommitteeFunctionConnectionUpdated_At | CommitteeFunctionConnectionRole | CommitteeFunctionConnectionAbbreviation | CommitteeFunctionConnectionFeatured_Role | CommitteeFunctionConnectionContact | CommitteeFunctionConnectionSlug | CommitteeFunctionConnectionRole_Description | CommitteeFunctionConnectionLocale | CommitteeFunctionConnectionPublished_At | CreateCommitteeFunctionPayload | UpdateCommitteeFunctionPayload | DeleteCommitteeFunctionPayload | CommitteeLandingpage | UpdateCommitteeLandingpagePayload | DeleteCommitteeLandingpagePayload | CommitteeObjective | CommitteeObjectiveConnection | CommitteeObjectiveAggregator | CommitteeObjectiveGroupBy | CommitteeObjectiveConnectionId | CommitteeObjectiveConnectionCreated_At | CommitteeObjectiveConnectionUpdated_At | CommitteeObjectiveConnectionObjective | CommitteeObjectiveConnectionLocale | CreateCommitteeObjectivePayload | UpdateCommitteeObjectivePayload | DeleteCommitteeObjectivePayload | Committee | CommitteeConnection | CommitteeAggregator | CommitteeGroupBy | CommitteeConnectionId | CommitteeConnectionCreated_At | CommitteeConnectionUpdated_At | CommitteeConnectionName | CommitteeConnectionCommittee_Objective | CommitteeConnectionAbbreviation | CommitteeConnectionSlug | CommitteeConnectionContent | CommitteeConnectionIcon | CommitteeConnectionLocale | CommitteeConnectionPublished_At | CreateCommitteePayload | UpdateCommitteePayload | DeleteCommitteePayload | Company | CompanyConnection | CompanyAggregator | CompanyGroupBy | CompanyConnectionId | CompanyConnectionCreated_At | CompanyConnectionUpdated_At | CompanyConnectionName | CompanyConnectionLogo | CompanyConnectionWebsite | CompanyConnectionBackgroundColor | CompanyConnectionSponsor | CompanyConnectionLocale | CompanyConnectionPublished_At | CreateCompanyPayload | UpdateCompanyPayload | DeleteCompanyPayload | Diet | DietConnection | DietAggregator | DietAggregatorSum | DietAggregatorAvg | DietAggregatorMin | DietAggregatorMax | DietGroupBy | DietConnectionId | DietConnectionCreated_At | DietConnectionUpdated_At | DietConnectionName | DietConnectionCount | DietConnectionLocale | DietConnectionPublished_At | CreateDietPayload | UpdateDietPayload | DeleteDietPayload | DocumentCategory | DocumentCategoryConnection | DocumentCategoryAggregator | DocumentCategoryGroupBy | DocumentCategoryConnectionId | DocumentCategoryConnectionCreated_At | DocumentCategoryConnectionUpdated_At | DocumentCategoryConnectionName | DocumentCategoryConnectionRelatedTo | DocumentCategoryConnectionLocale | CreateDocumentCategoryPayload | UpdateDocumentCategoryPayload | DeleteDocumentCategoryPayload | Document | UpdateDocumentPayload | DeleteDocumentPayload | EventCategory | EventCategoryConnection | EventCategoryAggregator | EventCategoryGroupBy | EventCategoryConnectionId | EventCategoryConnectionCreated_At | EventCategoryConnectionUpdated_At | EventCategoryConnectionName | EventCategoryConnectionLocale | EventCategoryConnectionPublished_At | CreateEventCategoryPayload | UpdateEventCategoryPayload | DeleteEventCategoryPayload | Event | EventConnection | EventAggregator | EventGroupBy | EventConnectionId | EventConnectionCreated_At | EventConnectionUpdated_At | EventConnectionTitle | EventConnectionSlug | EventConnectionCommittee | EventConnectionCategory | EventConnectionBody | EventConnectionPublic | EventConnectionPassword | EventConnectionSchedule | EventConnectionLocation | EventConnectionDescription | EventConnectionLocale | EventConnectionPublished_At | CreateEventPayload | UpdateEventPayload | DeleteEventPayload | Feedback | FeedbackConnection | FeedbackAggregator | FeedbackGroupBy | FeedbackConnectionId | FeedbackConnectionCreated_At | FeedbackConnectionUpdated_At | FeedbackConnectionEmotion | FeedbackConnectionContent | FeedbackConnectionPublishable | FeedbackConnectionPublished_At | CreateFeedbackPayload | UpdateFeedbackPayload | DeleteFeedbackPayload | Footer | UpdateFooterPayload | DeleteFooterPayload | Header | UpdateHeaderPayload | DeleteHeaderPayload | JobCategory | JobCategoryConnection | JobCategoryAggregator | JobCategoryGroupBy | JobCategoryConnectionId | JobCategoryConnectionCreated_At | JobCategoryConnectionUpdated_At | JobCategoryConnectionName | JobCategoryConnectionLocale | JobCategoryConnectionPublished_At | CreateJobCategoryPayload | UpdateJobCategoryPayload | DeleteJobCategoryPayload | Jobs | JobsConnection | JobsAggregator | JobsGroupBy | JobsConnectionId | JobsConnectionCreated_At | JobsConnectionUpdated_At | JobsConnectionTitle | JobsConnectionSlug | JobsConnectionDeadlineDate | JobsConnectionStartDate | JobsConnectionJobCategory | JobsConnectionCompany | JobsConnectionBody | JobsConnectionPosition | JobsConnectionLocation | JobsConnectionDescription | JobsConnectionBanner | JobsConnectionLocale | JobsConnectionPublished_At | CreateJobPayload | UpdateJobPayload | DeleteJobPayload | MetaOption | MetaOptionConnection | MetaOptionAggregator | MetaOptionGroupBy | MetaOptionConnectionId | MetaOptionConnectionCreated_At | MetaOptionConnectionUpdated_At | MetaOptionConnectionName | CreateMetaOptionPayload | UpdateMetaOptionPayload | DeleteMetaOptionPayload | Order | OrderConnection | OrderAggregator | OrderGroupBy | OrderConnectionId | OrderConnectionCreated_At | OrderConnectionUpdated_At | OrderConnectionData | OrderConnectionEvent | CreateOrderPayload | UpdateOrderPayload | DeleteOrderPayload | Post | PostConnection | PostAggregator | PostGroupBy | PostConnectionId | PostConnectionCreated_At | PostConnectionUpdated_At | PostConnectionTitle | PostConnectionDescription | PostConnectionSlug | PostConnectionAdminUser | PostConnectionCommittee | PostConnectionBody | PostConnectionBanner | PostConnectionLocale | PostConnectionPublished_At | CreatePostPayload | UpdatePostPayload | DeletePostPayload | ProductOption | ProductOptionConnection | ProductOptionAggregator | ProductOptionGroupBy | ProductOptionConnectionId | ProductOptionConnectionCreated_At | ProductOptionConnectionUpdated_At | ProductOptionConnectionName | ProductOptionConnectionReference | ProductOptionConnectionAllowMany | CreateProductOptionPayload | UpdateProductOptionPayload | DeleteProductOptionPayload | Product | ProductConnection | ProductAggregator | ProductAggregatorSum | ProductAggregatorAvg | ProductAggregatorMin | ProductAggregatorMax | ProductGroupBy | ProductConnectionId | ProductConnectionCreated_At | ProductConnectionUpdated_At | ProductConnectionName | ProductConnectionPrice | ProductConnectionStock | ProductConnectionCount | ProductConnectionMedia | ProductConnectionReference | ProductConnectionConsumable | ProductConnectionDescription | ProductConnectionPublished_At | CreateProductPayload | UpdateProductPayload | DeleteProductPayload | Representative | RepresentativeConnection | RepresentativeAggregator | RepresentativeGroupBy | RepresentativeConnectionId | RepresentativeConnectionCreated_At | RepresentativeConnectionUpdated_At | RepresentativeConnectionUser | RepresentativeConnectionCover | RepresentativeConnectionHidden | RepresentativeConnectionChapter_Year | RepresentativeConnectionPersonal_Description | RepresentativeConnectionLocale | RepresentativeConnectionPublished_At | CreateRepresentativePayload | UpdateRepresentativePayload | DeleteRepresentativePayload | EmailDesignerEmailTemplate | I18NLocale | UploadFile | UploadFileConnection | UploadFileAggregator | UploadFileAggregatorSum | UploadFileAggregatorAvg | UploadFileAggregatorMin | UploadFileAggregatorMax | UploadFileGroupBy | UploadFileConnectionId | UploadFileConnectionCreated_At | UploadFileConnectionUpdated_At | UploadFileConnectionName | UploadFileConnectionAlternativeText | UploadFileConnectionCaption | UploadFileConnectionWidth | UploadFileConnectionHeight | UploadFileConnectionFormats | UploadFileConnectionHash | UploadFileConnectionExt | UploadFileConnectionMime | UploadFileConnectionSize | UploadFileConnectionUrl | UploadFileConnectionPreviewUrl | UploadFileConnectionProvider | UploadFileConnectionProvider_Metadata | DeleteFilePayload | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsRoleConnection | UsersPermissionsRoleAggregator | UsersPermissionsRoleGroupBy | UsersPermissionsRoleConnectionId | UsersPermissionsRoleConnectionName | UsersPermissionsRoleConnectionDescription | UsersPermissionsRoleConnectionType | CreateRolePayload | UpdateRolePayload | DeleteRolePayload | UsersPermissionsUser | UsersPermissionsUserConnection | UsersPermissionsUserAggregator | UsersPermissionsUserGroupBy | UsersPermissionsUserConnectionId | UsersPermissionsUserConnectionCreated_At | UsersPermissionsUserConnectionUpdated_At | UsersPermissionsUserConnectionUsername | UsersPermissionsUserConnectionEmail | UsersPermissionsUserConnectionProvider | UsersPermissionsUserConnectionConfirmed | UsersPermissionsUserConnectionBlocked | UsersPermissionsUserConnectionRole | UsersPermissionsUserConnectionNickname | UsersPermissionsUserConnectionFirstname | UsersPermissionsUserConnectionLastname | UsersPermissionsUserConnectionChapter_Year | CreateUserPayload | UpdateUserPayload | DeleteUserPayload | ComponentDocumentDocuments | ComponentEventFormInput | ComponentEventFormOption | ComponentEventFormSelect | ComponentEventFormSwitch | ComponentEventInternalDeadline | ComponentEventInternalDietPreference | ComponentEventInternalEndTime | ComponentEventInternalExtraOptions | ComponentEventInternalOptions | ComponentEventInternalOrderOption | ComponentEventInternalSchedule | ComponentEventInternalStartTime | ComponentEventInternalStreet | ComponentEventInternalTicket | ComponentEventPasswordProtect | ComponentEventPlace | ComponentEventRecipient | ComponentEventSchedule | ComponentEventServing | ComponentEventStudent | ComponentEventTicketReference | ComponentEventTickets | ComponentFooterSocial | ComponentFormInternalsCheckboxOption | ComponentFormInternalsOption | ComponentFormCheckbox | ComponentFormEmail | ComponentFormEventPassword | ComponentFormInput | ComponentFormSelect | ComponentHeaderContact | ComponentHeaderFeedbackbox | ComponentHeaderLanguages | ComponentHeaderLogo | ComponentHeaderMenuSection | ComponentHeaderSubSection | ComponentJobAbout | ComponentJobContact | ComponentJobDescription | ComponentJobImage | ComponentJobMail | ComponentJobRequirements | ComponentJobTaskItem | ComponentJobTasks | ComponentJobYear;

export type Mutation = {
  __typename?: 'Mutation';
  updateAcceptedStudent?: Maybe<UpdateAcceptedStudentPayload>;
  deleteAcceptedStudent?: Maybe<DeleteAcceptedStudentPayload>;
  createAllergy?: Maybe<CreateAllergyPayload>;
  updateAllergy?: Maybe<UpdateAllergyPayload>;
  deleteAllergy?: Maybe<DeleteAllergyPayload>;
  updateAssumedStudent?: Maybe<UpdateAssumedStudentPayload>;
  deleteAssumedStudent?: Maybe<DeleteAssumedStudentPayload>;
  createCategory?: Maybe<CreateCategoryPayload>;
  updateCategory?: Maybe<UpdateCategoryPayload>;
  deleteCategory?: Maybe<DeleteCategoryPayload>;
  createChapterYear?: Maybe<CreateChapterYearPayload>;
  updateChapterYear?: Maybe<UpdateChapterYearPayload>;
  deleteChapterYear?: Maybe<DeleteChapterYearPayload>;
  updateChapter?: Maybe<UpdateChapterPayload>;
  deleteChapter?: Maybe<DeleteChapterPayload>;
  createCommitteeFunction?: Maybe<CreateCommitteeFunctionPayload>;
  updateCommitteeFunction?: Maybe<UpdateCommitteeFunctionPayload>;
  deleteCommitteeFunction?: Maybe<DeleteCommitteeFunctionPayload>;
  updateCommitteeLandingpage?: Maybe<UpdateCommitteeLandingpagePayload>;
  deleteCommitteeLandingpage?: Maybe<DeleteCommitteeLandingpagePayload>;
  createCommitteeObjective?: Maybe<CreateCommitteeObjectivePayload>;
  updateCommitteeObjective?: Maybe<UpdateCommitteeObjectivePayload>;
  deleteCommitteeObjective?: Maybe<DeleteCommitteeObjectivePayload>;
  createCommittee?: Maybe<CreateCommitteePayload>;
  updateCommittee?: Maybe<UpdateCommitteePayload>;
  deleteCommittee?: Maybe<DeleteCommitteePayload>;
  createCompany?: Maybe<CreateCompanyPayload>;
  updateCompany?: Maybe<UpdateCompanyPayload>;
  deleteCompany?: Maybe<DeleteCompanyPayload>;
  createDiet?: Maybe<CreateDietPayload>;
  updateDiet?: Maybe<UpdateDietPayload>;
  deleteDiet?: Maybe<DeleteDietPayload>;
  createDocumentCategory?: Maybe<CreateDocumentCategoryPayload>;
  updateDocumentCategory?: Maybe<UpdateDocumentCategoryPayload>;
  deleteDocumentCategory?: Maybe<DeleteDocumentCategoryPayload>;
  updateDocument?: Maybe<UpdateDocumentPayload>;
  deleteDocument?: Maybe<DeleteDocumentPayload>;
  createEventCategory?: Maybe<CreateEventCategoryPayload>;
  updateEventCategory?: Maybe<UpdateEventCategoryPayload>;
  deleteEventCategory?: Maybe<DeleteEventCategoryPayload>;
  createEvent?: Maybe<CreateEventPayload>;
  updateEvent?: Maybe<UpdateEventPayload>;
  deleteEvent?: Maybe<DeleteEventPayload>;
  createFeedback?: Maybe<CreateFeedbackPayload>;
  updateFeedback?: Maybe<UpdateFeedbackPayload>;
  deleteFeedback?: Maybe<DeleteFeedbackPayload>;
  updateFooter?: Maybe<UpdateFooterPayload>;
  deleteFooter?: Maybe<DeleteFooterPayload>;
  updateHeader?: Maybe<UpdateHeaderPayload>;
  deleteHeader?: Maybe<DeleteHeaderPayload>;
  createJobCategory?: Maybe<CreateJobCategoryPayload>;
  updateJobCategory?: Maybe<UpdateJobCategoryPayload>;
  deleteJobCategory?: Maybe<DeleteJobCategoryPayload>;
  createJob?: Maybe<CreateJobPayload>;
  updateJob?: Maybe<UpdateJobPayload>;
  deleteJob?: Maybe<DeleteJobPayload>;
  createMetaOption?: Maybe<CreateMetaOptionPayload>;
  updateMetaOption?: Maybe<UpdateMetaOptionPayload>;
  deleteMetaOption?: Maybe<DeleteMetaOptionPayload>;
  createOrder?: Maybe<CreateOrderPayload>;
  updateOrder?: Maybe<UpdateOrderPayload>;
  deleteOrder?: Maybe<DeleteOrderPayload>;
  createPost?: Maybe<CreatePostPayload>;
  updatePost?: Maybe<UpdatePostPayload>;
  deletePost?: Maybe<DeletePostPayload>;
  createProductOption?: Maybe<CreateProductOptionPayload>;
  updateProductOption?: Maybe<UpdateProductOptionPayload>;
  deleteProductOption?: Maybe<DeleteProductOptionPayload>;
  createProduct?: Maybe<CreateProductPayload>;
  updateProduct?: Maybe<UpdateProductPayload>;
  deleteProduct?: Maybe<DeleteProductPayload>;
  createRepresentative?: Maybe<CreateRepresentativePayload>;
  updateRepresentative?: Maybe<UpdateRepresentativePayload>;
  deleteRepresentative?: Maybe<DeleteRepresentativePayload>;
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
  createAcceptedStudentLocalization: AcceptedStudent;
  createAllergyLocalization: Allergy;
  createAssumedStudentLocalization: AssumedStudent;
  createCategoryLocalization: Category;
  createChapterLocalization: Chapter;
  createCommitteeFunctionLocalization: CommitteeFunction;
  createCommitteeLandingpageLocalization: CommitteeLandingpage;
  createCommitteeObjectiveLocalization: CommitteeObjective;
  createCommitteeLocalization: Committee;
  createCompanyLocalization: Company;
  createDietLocalization: Diet;
  createDocumentCategoryLocalization: DocumentCategory;
  createDocumentLocalization: Document;
  createEventCategoryLocalization: EventCategory;
  createEventLocalization: Event;
  createFooterLocalization: Footer;
  createHeaderLocalization: Header;
  createJobCategoryLocalization: JobCategory;
  createJobLocalization: Jobs;
  createPostLocalization: Post;
  createRepresentativeLocalization: Representative;
  upload: UploadFile;
  multipleUpload: Array<Maybe<UploadFile>>;
  updateFileInfo: UploadFile;
  login: UsersPermissionsLoginPayload;
  register: UsersPermissionsLoginPayload;
  forgotPassword?: Maybe<UserPermissionsPasswordPayload>;
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
};


export type MutationUpdateAcceptedStudentArgs = {
  input?: Maybe<UpdateAcceptedStudentInput>;
  locale?: Maybe<Scalars['String']>;
};


export type MutationDeleteAcceptedStudentArgs = {
  locale?: Maybe<Scalars['String']>;
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


export type MutationUpdateAssumedStudentArgs = {
  input?: Maybe<UpdateAssumedStudentInput>;
  locale?: Maybe<Scalars['String']>;
};


export type MutationDeleteAssumedStudentArgs = {
  locale?: Maybe<Scalars['String']>;
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


export type MutationCreateChapterYearArgs = {
  input?: Maybe<CreateChapterYearInput>;
};


export type MutationUpdateChapterYearArgs = {
  input?: Maybe<UpdateChapterYearInput>;
};


export type MutationDeleteChapterYearArgs = {
  input?: Maybe<DeleteChapterYearInput>;
};


export type MutationUpdateChapterArgs = {
  input?: Maybe<UpdateChapterInput>;
  locale?: Maybe<Scalars['String']>;
};


export type MutationDeleteChapterArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type MutationCreateCommitteeFunctionArgs = {
  input?: Maybe<CreateCommitteeFunctionInput>;
};


export type MutationUpdateCommitteeFunctionArgs = {
  input?: Maybe<UpdateCommitteeFunctionInput>;
};


export type MutationDeleteCommitteeFunctionArgs = {
  input?: Maybe<DeleteCommitteeFunctionInput>;
};


export type MutationUpdateCommitteeLandingpageArgs = {
  input?: Maybe<UpdateCommitteeLandingpageInput>;
  locale?: Maybe<Scalars['String']>;
};


export type MutationDeleteCommitteeLandingpageArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type MutationCreateCommitteeObjectiveArgs = {
  input?: Maybe<CreateCommitteeObjectiveInput>;
};


export type MutationUpdateCommitteeObjectiveArgs = {
  input?: Maybe<UpdateCommitteeObjectiveInput>;
};


export type MutationDeleteCommitteeObjectiveArgs = {
  input?: Maybe<DeleteCommitteeObjectiveInput>;
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


export type MutationCreateCompanyArgs = {
  input?: Maybe<CreateCompanyInput>;
};


export type MutationUpdateCompanyArgs = {
  input?: Maybe<UpdateCompanyInput>;
};


export type MutationDeleteCompanyArgs = {
  input?: Maybe<DeleteCompanyInput>;
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


export type MutationCreateDocumentCategoryArgs = {
  input?: Maybe<CreateDocumentCategoryInput>;
};


export type MutationUpdateDocumentCategoryArgs = {
  input?: Maybe<UpdateDocumentCategoryInput>;
};


export type MutationDeleteDocumentCategoryArgs = {
  input?: Maybe<DeleteDocumentCategoryInput>;
};


export type MutationUpdateDocumentArgs = {
  input?: Maybe<UpdateDocumentInput>;
  locale?: Maybe<Scalars['String']>;
};


export type MutationDeleteDocumentArgs = {
  locale?: Maybe<Scalars['String']>;
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


export type MutationCreateFeedbackArgs = {
  input?: Maybe<CreateFeedbackInput>;
};


export type MutationUpdateFeedbackArgs = {
  input?: Maybe<UpdateFeedbackInput>;
};


export type MutationDeleteFeedbackArgs = {
  input?: Maybe<DeleteFeedbackInput>;
};


export type MutationUpdateFooterArgs = {
  input?: Maybe<UpdateFooterInput>;
  locale?: Maybe<Scalars['String']>;
};


export type MutationDeleteFooterArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type MutationUpdateHeaderArgs = {
  input?: Maybe<UpdateHeaderInput>;
  locale?: Maybe<Scalars['String']>;
};


export type MutationDeleteHeaderArgs = {
  locale?: Maybe<Scalars['String']>;
};


export type MutationCreateJobCategoryArgs = {
  input?: Maybe<CreateJobCategoryInput>;
};


export type MutationUpdateJobCategoryArgs = {
  input?: Maybe<UpdateJobCategoryInput>;
};


export type MutationDeleteJobCategoryArgs = {
  input?: Maybe<DeleteJobCategoryInput>;
};


export type MutationCreateJobArgs = {
  input?: Maybe<CreateJobInput>;
};


export type MutationUpdateJobArgs = {
  input?: Maybe<UpdateJobInput>;
};


export type MutationDeleteJobArgs = {
  input?: Maybe<DeleteJobInput>;
};


export type MutationCreateMetaOptionArgs = {
  input?: Maybe<CreateMetaOptionInput>;
};


export type MutationUpdateMetaOptionArgs = {
  input?: Maybe<UpdateMetaOptionInput>;
};


export type MutationDeleteMetaOptionArgs = {
  input?: Maybe<DeleteMetaOptionInput>;
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


export type MutationCreateProductOptionArgs = {
  input?: Maybe<CreateProductOptionInput>;
};


export type MutationUpdateProductOptionArgs = {
  input?: Maybe<UpdateProductOptionInput>;
};


export type MutationDeleteProductOptionArgs = {
  input?: Maybe<DeleteProductOptionInput>;
};


export type MutationCreateProductArgs = {
  input?: Maybe<CreateProductInput>;
};


export type MutationUpdateProductArgs = {
  input?: Maybe<UpdateProductInput>;
};


export type MutationDeleteProductArgs = {
  input?: Maybe<DeleteProductInput>;
};


export type MutationCreateRepresentativeArgs = {
  input?: Maybe<CreateRepresentativeInput>;
};


export type MutationUpdateRepresentativeArgs = {
  input?: Maybe<UpdateRepresentativeInput>;
};


export type MutationDeleteRepresentativeArgs = {
  input?: Maybe<DeleteRepresentativeInput>;
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


export type MutationCreateAcceptedStudentLocalizationArgs = {
  input: UpdateAcceptedStudentInput;
};


export type MutationCreateAllergyLocalizationArgs = {
  input: UpdateAllergyInput;
};


export type MutationCreateAssumedStudentLocalizationArgs = {
  input: UpdateAssumedStudentInput;
};


export type MutationCreateCategoryLocalizationArgs = {
  input: UpdateCategoryInput;
};


export type MutationCreateChapterLocalizationArgs = {
  input: UpdateChapterInput;
};


export type MutationCreateCommitteeFunctionLocalizationArgs = {
  input: UpdateCommitteeFunctionInput;
};


export type MutationCreateCommitteeLandingpageLocalizationArgs = {
  input: UpdateCommitteeLandingpageInput;
};


export type MutationCreateCommitteeObjectiveLocalizationArgs = {
  input: UpdateCommitteeObjectiveInput;
};


export type MutationCreateCommitteeLocalizationArgs = {
  input: UpdateCommitteeInput;
};


export type MutationCreateCompanyLocalizationArgs = {
  input: UpdateCompanyInput;
};


export type MutationCreateDietLocalizationArgs = {
  input: UpdateDietInput;
};


export type MutationCreateDocumentCategoryLocalizationArgs = {
  input: UpdateDocumentCategoryInput;
};


export type MutationCreateDocumentLocalizationArgs = {
  input: UpdateDocumentInput;
};


export type MutationCreateEventCategoryLocalizationArgs = {
  input: UpdateEventCategoryInput;
};


export type MutationCreateEventLocalizationArgs = {
  input: UpdateEventInput;
};


export type MutationCreateFooterLocalizationArgs = {
  input: UpdateFooterInput;
};


export type MutationCreateHeaderLocalizationArgs = {
  input: UpdateHeaderInput;
};


export type MutationCreateJobCategoryLocalizationArgs = {
  input: UpdateJobCategoryInput;
};


export type MutationCreateJobLocalizationArgs = {
  input: UpdateJobInput;
};


export type MutationCreatePostLocalizationArgs = {
  input: UpdatePostInput;
};


export type MutationCreateRepresentativeLocalizationArgs = {
  input: UpdateRepresentativeInput;
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
  data: Scalars['JSON'];
  event?: Maybe<Event>;
  products?: Maybe<Array<Maybe<Product>>>;
};


export type OrderProductsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type OrderAggregator = {
  __typename?: 'OrderAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type OrderConnection = {
  __typename?: 'OrderConnection';
  values?: Maybe<Array<Maybe<Order>>>;
  groupBy?: Maybe<OrderGroupBy>;
  aggregate?: Maybe<OrderAggregator>;
};

export type OrderConnectionCreated_At = {
  __typename?: 'OrderConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<OrderConnection>;
};

export type OrderConnectionData = {
  __typename?: 'OrderConnectionData';
  key?: Maybe<Scalars['JSON']>;
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
  data?: Maybe<Array<Maybe<OrderConnectionData>>>;
  event?: Maybe<Array<Maybe<OrderConnectionEvent>>>;
};

export type OrderInput = {
  data: Scalars['JSON'];
  event?: Maybe<Scalars['ID']>;
  products?: Maybe<Array<Maybe<Scalars['ID']>>>;
  reference: Scalars['String'];
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
  body?: Maybe<Scalars['String']>;
  banner?: Maybe<UploadFile>;
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

export type PostConnectionBanner = {
  __typename?: 'PostConnectionBanner';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<PostConnection>;
};

export type PostConnectionBody = {
  __typename?: 'PostConnectionBody';
  key?: Maybe<Scalars['String']>;
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
  body?: Maybe<Array<Maybe<PostConnectionBody>>>;
  banner?: Maybe<Array<Maybe<PostConnectionBanner>>>;
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
  body?: Maybe<Scalars['String']>;
  banner?: Maybe<Scalars['ID']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  name: Scalars['String'];
  price: Scalars['Float'];
  stock: Scalars['Int'];
  count: Scalars['Int'];
  media?: Maybe<UploadFile>;
  reference: Scalars['String'];
  consumable: Scalars['Boolean'];
  description: Scalars['String'];
  published_at?: Maybe<Scalars['DateTime']>;
  product_options?: Maybe<Array<Maybe<ProductOption>>>;
};


export type ProductProduct_OptionsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type ProductAggregator = {
  __typename?: 'ProductAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
  sum?: Maybe<ProductAggregatorSum>;
  avg?: Maybe<ProductAggregatorAvg>;
  min?: Maybe<ProductAggregatorMin>;
  max?: Maybe<ProductAggregatorMax>;
};

export type ProductAggregatorAvg = {
  __typename?: 'ProductAggregatorAvg';
  price?: Maybe<Scalars['Float']>;
  stock?: Maybe<Scalars['Float']>;
  count?: Maybe<Scalars['Float']>;
};

export type ProductAggregatorMax = {
  __typename?: 'ProductAggregatorMax';
  price?: Maybe<Scalars['Float']>;
  stock?: Maybe<Scalars['Float']>;
  count?: Maybe<Scalars['Float']>;
};

export type ProductAggregatorMin = {
  __typename?: 'ProductAggregatorMin';
  price?: Maybe<Scalars['Float']>;
  stock?: Maybe<Scalars['Float']>;
  count?: Maybe<Scalars['Float']>;
};

export type ProductAggregatorSum = {
  __typename?: 'ProductAggregatorSum';
  price?: Maybe<Scalars['Float']>;
  stock?: Maybe<Scalars['Float']>;
  count?: Maybe<Scalars['Float']>;
};

export type ProductConnection = {
  __typename?: 'ProductConnection';
  values?: Maybe<Array<Maybe<Product>>>;
  groupBy?: Maybe<ProductGroupBy>;
  aggregate?: Maybe<ProductAggregator>;
};

export type ProductConnectionConsumable = {
  __typename?: 'ProductConnectionConsumable';
  key?: Maybe<Scalars['Boolean']>;
  connection?: Maybe<ProductConnection>;
};

export type ProductConnectionCount = {
  __typename?: 'ProductConnectionCount';
  key?: Maybe<Scalars['Int']>;
  connection?: Maybe<ProductConnection>;
};

export type ProductConnectionCreated_At = {
  __typename?: 'ProductConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<ProductConnection>;
};

export type ProductConnectionDescription = {
  __typename?: 'ProductConnectionDescription';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<ProductConnection>;
};

export type ProductConnectionId = {
  __typename?: 'ProductConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<ProductConnection>;
};

export type ProductConnectionMedia = {
  __typename?: 'ProductConnectionMedia';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<ProductConnection>;
};

export type ProductConnectionName = {
  __typename?: 'ProductConnectionName';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<ProductConnection>;
};

export type ProductConnectionPrice = {
  __typename?: 'ProductConnectionPrice';
  key?: Maybe<Scalars['Float']>;
  connection?: Maybe<ProductConnection>;
};

export type ProductConnectionPublished_At = {
  __typename?: 'ProductConnectionPublished_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<ProductConnection>;
};

export type ProductConnectionReference = {
  __typename?: 'ProductConnectionReference';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<ProductConnection>;
};

export type ProductConnectionStock = {
  __typename?: 'ProductConnectionStock';
  key?: Maybe<Scalars['Int']>;
  connection?: Maybe<ProductConnection>;
};

export type ProductConnectionUpdated_At = {
  __typename?: 'ProductConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<ProductConnection>;
};

export type ProductGroupBy = {
  __typename?: 'ProductGroupBy';
  id?: Maybe<Array<Maybe<ProductConnectionId>>>;
  created_at?: Maybe<Array<Maybe<ProductConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<ProductConnectionUpdated_At>>>;
  name?: Maybe<Array<Maybe<ProductConnectionName>>>;
  price?: Maybe<Array<Maybe<ProductConnectionPrice>>>;
  stock?: Maybe<Array<Maybe<ProductConnectionStock>>>;
  count?: Maybe<Array<Maybe<ProductConnectionCount>>>;
  media?: Maybe<Array<Maybe<ProductConnectionMedia>>>;
  reference?: Maybe<Array<Maybe<ProductConnectionReference>>>;
  consumable?: Maybe<Array<Maybe<ProductConnectionConsumable>>>;
  description?: Maybe<Array<Maybe<ProductConnectionDescription>>>;
  published_at?: Maybe<Array<Maybe<ProductConnectionPublished_At>>>;
};

export type ProductInput = {
  name: Scalars['String'];
  price?: Maybe<Scalars['Float']>;
  stock?: Maybe<Scalars['Int']>;
  count?: Maybe<Scalars['Int']>;
  media?: Maybe<Scalars['ID']>;
  reference: Scalars['String'];
  product_options?: Maybe<Array<Maybe<Scalars['ID']>>>;
  consumable?: Maybe<Scalars['Boolean']>;
  description: Scalars['String'];
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type ProductOption = {
  __typename?: 'ProductOption';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  name: Scalars['String'];
  data: Array<Maybe<ProductOptionDataDynamicZone>>;
  reference: Scalars['String'];
  allowMany: Scalars['Boolean'];
};

export type ProductOptionAggregator = {
  __typename?: 'ProductOptionAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type ProductOptionConnection = {
  __typename?: 'ProductOptionConnection';
  values?: Maybe<Array<Maybe<ProductOption>>>;
  groupBy?: Maybe<ProductOptionGroupBy>;
  aggregate?: Maybe<ProductOptionAggregator>;
};

export type ProductOptionConnectionAllowMany = {
  __typename?: 'ProductOptionConnectionAllowMany';
  key?: Maybe<Scalars['Boolean']>;
  connection?: Maybe<ProductOptionConnection>;
};

export type ProductOptionConnectionCreated_At = {
  __typename?: 'ProductOptionConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<ProductOptionConnection>;
};

export type ProductOptionConnectionId = {
  __typename?: 'ProductOptionConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<ProductOptionConnection>;
};

export type ProductOptionConnectionName = {
  __typename?: 'ProductOptionConnectionName';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<ProductOptionConnection>;
};

export type ProductOptionConnectionReference = {
  __typename?: 'ProductOptionConnectionReference';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<ProductOptionConnection>;
};

export type ProductOptionConnectionUpdated_At = {
  __typename?: 'ProductOptionConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<ProductOptionConnection>;
};

export type ProductOptionDataDynamicZone = ComponentEventFormInput | ComponentEventFormSelect | ComponentEventFormSwitch;


export type ProductOptionGroupBy = {
  __typename?: 'ProductOptionGroupBy';
  id?: Maybe<Array<Maybe<ProductOptionConnectionId>>>;
  created_at?: Maybe<Array<Maybe<ProductOptionConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<ProductOptionConnectionUpdated_At>>>;
  name?: Maybe<Array<Maybe<ProductOptionConnectionName>>>;
  reference?: Maybe<Array<Maybe<ProductOptionConnectionReference>>>;
  allowMany?: Maybe<Array<Maybe<ProductOptionConnectionAllowMany>>>;
};

export type ProductOptionInput = {
  name: Scalars['String'];
  data: Array<Scalars['ProductOptionDataDynamicZoneInput']>;
  reference: Scalars['String'];
  allowMany?: Maybe<Scalars['Boolean']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export enum PublicationState {
  Live = 'LIVE',
  Preview = 'PREVIEW'
}

export type Query = {
  __typename?: 'Query';
  acceptedStudent?: Maybe<AcceptedStudent>;
  allergy?: Maybe<Allergy>;
  allergies?: Maybe<Array<Maybe<Allergy>>>;
  allergiesConnection?: Maybe<AllergyConnection>;
  assumedStudent?: Maybe<AssumedStudent>;
  category?: Maybe<Category>;
  categories?: Maybe<Array<Maybe<Category>>>;
  categoriesConnection?: Maybe<CategoryConnection>;
  chapterYear?: Maybe<ChapterYear>;
  chapterYears?: Maybe<Array<Maybe<ChapterYear>>>;
  chapterYearsConnection?: Maybe<ChapterYearConnection>;
  chapter?: Maybe<Chapter>;
  committeeFunction?: Maybe<CommitteeFunction>;
  committeeFunctions?: Maybe<Array<Maybe<CommitteeFunction>>>;
  committeeFunctionsConnection?: Maybe<CommitteeFunctionConnection>;
  committeeLandingpage?: Maybe<CommitteeLandingpage>;
  committeeObjective?: Maybe<CommitteeObjective>;
  committeeObjectives?: Maybe<Array<Maybe<CommitteeObjective>>>;
  committeeObjectivesConnection?: Maybe<CommitteeObjectiveConnection>;
  committee?: Maybe<Committee>;
  committees?: Maybe<Array<Maybe<Committee>>>;
  committeesConnection?: Maybe<CommitteeConnection>;
  company?: Maybe<Company>;
  companies?: Maybe<Array<Maybe<Company>>>;
  companiesConnection?: Maybe<CompanyConnection>;
  diet?: Maybe<Diet>;
  diets?: Maybe<Array<Maybe<Diet>>>;
  dietsConnection?: Maybe<DietConnection>;
  documentCategory?: Maybe<DocumentCategory>;
  documentCategories?: Maybe<Array<Maybe<DocumentCategory>>>;
  documentCategoriesConnection?: Maybe<DocumentCategoryConnection>;
  document?: Maybe<Document>;
  eventCategory?: Maybe<EventCategory>;
  eventCategories?: Maybe<Array<Maybe<EventCategory>>>;
  eventCategoriesConnection?: Maybe<EventCategoryConnection>;
  event?: Maybe<Event>;
  events?: Maybe<Array<Maybe<Event>>>;
  eventsConnection?: Maybe<EventConnection>;
  feedback?: Maybe<Feedback>;
  feedbacks?: Maybe<Array<Maybe<Feedback>>>;
  feedbacksConnection?: Maybe<FeedbackConnection>;
  footer?: Maybe<Footer>;
  header?: Maybe<Header>;
  jobCategory?: Maybe<JobCategory>;
  jobCategories?: Maybe<Array<Maybe<JobCategory>>>;
  jobCategoriesConnection?: Maybe<JobCategoryConnection>;
  job?: Maybe<Jobs>;
  jobs?: Maybe<Array<Maybe<Jobs>>>;
  jobsConnection?: Maybe<JobsConnection>;
  metaOption?: Maybe<MetaOption>;
  metaOptions?: Maybe<Array<Maybe<MetaOption>>>;
  metaOptionsConnection?: Maybe<MetaOptionConnection>;
  order?: Maybe<Order>;
  orders?: Maybe<Array<Maybe<Order>>>;
  ordersConnection?: Maybe<OrderConnection>;
  post?: Maybe<Post>;
  posts?: Maybe<Array<Maybe<Post>>>;
  postsConnection?: Maybe<PostConnection>;
  productOption?: Maybe<ProductOption>;
  productOptions?: Maybe<Array<Maybe<ProductOption>>>;
  productOptionsConnection?: Maybe<ProductOptionConnection>;
  product?: Maybe<Product>;
  products?: Maybe<Array<Maybe<Product>>>;
  productsConnection?: Maybe<ProductConnection>;
  representative?: Maybe<Representative>;
  representatives?: Maybe<Array<Maybe<Representative>>>;
  representativesConnection?: Maybe<RepresentativeConnection>;
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


export type QueryAcceptedStudentArgs = {
  publicationState?: Maybe<PublicationState>;
  locale?: Maybe<Scalars['String']>;
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


export type QueryAssumedStudentArgs = {
  publicationState?: Maybe<PublicationState>;
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


export type QueryChapterYearArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryChapterYearsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
};


export type QueryChapterYearsConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryChapterArgs = {
  publicationState?: Maybe<PublicationState>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryCommitteeFunctionArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryCommitteeFunctionsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryCommitteeFunctionsConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryCommitteeLandingpageArgs = {
  publicationState?: Maybe<PublicationState>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryCommitteeObjectiveArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryCommitteeObjectivesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryCommitteeObjectivesConnectionArgs = {
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


export type QueryCompanyArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryCompaniesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryCompaniesConnectionArgs = {
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


export type QueryDocumentCategoryArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryDocumentCategoriesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryDocumentCategoriesConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryDocumentArgs = {
  publicationState?: Maybe<PublicationState>;
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


export type QueryFeedbackArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryFeedbacksArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
};


export type QueryFeedbacksConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryFooterArgs = {
  publicationState?: Maybe<PublicationState>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryHeaderArgs = {
  publicationState?: Maybe<PublicationState>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryJobCategoryArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryJobCategoriesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryJobCategoriesConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryJobArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryJobsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryJobsConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryMetaOptionArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryMetaOptionsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
};


export type QueryMetaOptionsConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
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


export type QueryProductOptionArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryProductOptionsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
};


export type QueryProductOptionsConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryProductArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryProductsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
};


export type QueryProductsConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type QueryRepresentativeArgs = {
  id: Scalars['ID'];
  publicationState?: Maybe<PublicationState>;
};


export type QueryRepresentativesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
  publicationState?: Maybe<PublicationState>;
  locale?: Maybe<Scalars['String']>;
};


export type QueryRepresentativesConnectionArgs = {
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

export type Representative = {
  __typename?: 'Representative';
  id: Scalars['ID'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  user?: Maybe<AdminUser>;
  cover?: Maybe<UploadFile>;
  hidden: Scalars['Boolean'];
  chapter_year?: Maybe<ChapterYear>;
  personal_description?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  committee_roles?: Maybe<Array<Maybe<CommitteeFunction>>>;
  committee_objectives?: Maybe<Array<Maybe<CommitteeObjective>>>;
  committees?: Maybe<Array<Maybe<Committee>>>;
  localizations?: Maybe<Array<Maybe<Representative>>>;
};


export type RepresentativeCommittee_RolesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type RepresentativeCommittee_ObjectivesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type RepresentativeCommitteesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};


export type RepresentativeLocalizationsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type RepresentativeAggregator = {
  __typename?: 'RepresentativeAggregator';
  count?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type RepresentativeConnection = {
  __typename?: 'RepresentativeConnection';
  values?: Maybe<Array<Maybe<Representative>>>;
  groupBy?: Maybe<RepresentativeGroupBy>;
  aggregate?: Maybe<RepresentativeAggregator>;
};

export type RepresentativeConnectionChapter_Year = {
  __typename?: 'RepresentativeConnectionChapter_year';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<RepresentativeConnection>;
};

export type RepresentativeConnectionCover = {
  __typename?: 'RepresentativeConnectionCover';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<RepresentativeConnection>;
};

export type RepresentativeConnectionCreated_At = {
  __typename?: 'RepresentativeConnectionCreated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<RepresentativeConnection>;
};

export type RepresentativeConnectionHidden = {
  __typename?: 'RepresentativeConnectionHidden';
  key?: Maybe<Scalars['Boolean']>;
  connection?: Maybe<RepresentativeConnection>;
};

export type RepresentativeConnectionId = {
  __typename?: 'RepresentativeConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<RepresentativeConnection>;
};

export type RepresentativeConnectionLocale = {
  __typename?: 'RepresentativeConnectionLocale';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<RepresentativeConnection>;
};

export type RepresentativeConnectionPersonal_Description = {
  __typename?: 'RepresentativeConnectionPersonal_description';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<RepresentativeConnection>;
};

export type RepresentativeConnectionPublished_At = {
  __typename?: 'RepresentativeConnectionPublished_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<RepresentativeConnection>;
};

export type RepresentativeConnectionUpdated_At = {
  __typename?: 'RepresentativeConnectionUpdated_at';
  key?: Maybe<Scalars['DateTime']>;
  connection?: Maybe<RepresentativeConnection>;
};

export type RepresentativeConnectionUser = {
  __typename?: 'RepresentativeConnectionUser';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<RepresentativeConnection>;
};

export type RepresentativeGroupBy = {
  __typename?: 'RepresentativeGroupBy';
  id?: Maybe<Array<Maybe<RepresentativeConnectionId>>>;
  created_at?: Maybe<Array<Maybe<RepresentativeConnectionCreated_At>>>;
  updated_at?: Maybe<Array<Maybe<RepresentativeConnectionUpdated_At>>>;
  user?: Maybe<Array<Maybe<RepresentativeConnectionUser>>>;
  cover?: Maybe<Array<Maybe<RepresentativeConnectionCover>>>;
  hidden?: Maybe<Array<Maybe<RepresentativeConnectionHidden>>>;
  chapter_year?: Maybe<Array<Maybe<RepresentativeConnectionChapter_Year>>>;
  personal_description?: Maybe<Array<Maybe<RepresentativeConnectionPersonal_Description>>>;
  locale?: Maybe<Array<Maybe<RepresentativeConnectionLocale>>>;
  published_at?: Maybe<Array<Maybe<RepresentativeConnectionPublished_At>>>;
};

export type RepresentativeInput = {
  user?: Maybe<Scalars['ID']>;
  committee_roles?: Maybe<Array<Maybe<Scalars['ID']>>>;
  committee_objectives?: Maybe<Array<Maybe<Scalars['ID']>>>;
  committees?: Maybe<Array<Maybe<Scalars['ID']>>>;
  cover?: Maybe<Scalars['ID']>;
  hidden?: Maybe<Scalars['Boolean']>;
  chapter_year?: Maybe<Scalars['ID']>;
  personal_description?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
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
  nickname?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  chapter_year?: Maybe<Scalars['ID']>;
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
  nickname?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  chapter_year?: Maybe<ChapterYear>;
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

export type UsersPermissionsUserConnectionChapter_Year = {
  __typename?: 'UsersPermissionsUserConnectionChapter_year';
  key?: Maybe<Scalars['ID']>;
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

export type UsersPermissionsUserConnectionFirstname = {
  __typename?: 'UsersPermissionsUserConnectionFirstname';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionId = {
  __typename?: 'UsersPermissionsUserConnectionId';
  key?: Maybe<Scalars['ID']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionLastname = {
  __typename?: 'UsersPermissionsUserConnectionLastname';
  key?: Maybe<Scalars['String']>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionNickname = {
  __typename?: 'UsersPermissionsUserConnectionNickname';
  key?: Maybe<Scalars['String']>;
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
  nickname?: Maybe<Array<Maybe<UsersPermissionsUserConnectionNickname>>>;
  firstname?: Maybe<Array<Maybe<UsersPermissionsUserConnectionFirstname>>>;
  lastname?: Maybe<Array<Maybe<UsersPermissionsUserConnectionLastname>>>;
  chapter_year?: Maybe<Array<Maybe<UsersPermissionsUserConnectionChapter_Year>>>;
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

export type CreateChapterYearInput = {
  data?: Maybe<ChapterYearInput>;
};

export type CreateChapterYearPayload = {
  __typename?: 'createChapterYearPayload';
  chapterYear?: Maybe<ChapterYear>;
};

export type CreateCommitteeFunctionInput = {
  data?: Maybe<CommitteeFunctionInput>;
};

export type CreateCommitteeFunctionPayload = {
  __typename?: 'createCommitteeFunctionPayload';
  committeeFunction?: Maybe<CommitteeFunction>;
};

export type CreateCommitteeInput = {
  data?: Maybe<CommitteeInput>;
};

export type CreateCommitteeObjectiveInput = {
  data?: Maybe<CommitteeObjectiveInput>;
};

export type CreateCommitteeObjectivePayload = {
  __typename?: 'createCommitteeObjectivePayload';
  committeeObjective?: Maybe<CommitteeObjective>;
};

export type CreateCommitteePayload = {
  __typename?: 'createCommitteePayload';
  committee?: Maybe<Committee>;
};

export type CreateCompanyInput = {
  data?: Maybe<CompanyInput>;
};

export type CreateCompanyPayload = {
  __typename?: 'createCompanyPayload';
  company?: Maybe<Company>;
};

export type CreateDietInput = {
  data?: Maybe<DietInput>;
};

export type CreateDietPayload = {
  __typename?: 'createDietPayload';
  diet?: Maybe<Diet>;
};

export type CreateDocumentCategoryInput = {
  data?: Maybe<DocumentCategoryInput>;
};

export type CreateDocumentCategoryPayload = {
  __typename?: 'createDocumentCategoryPayload';
  documentCategory?: Maybe<DocumentCategory>;
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

export type CreateFeedbackInput = {
  data?: Maybe<FeedbackInput>;
};

export type CreateFeedbackPayload = {
  __typename?: 'createFeedbackPayload';
  feedback?: Maybe<Feedback>;
};

export type CreateJobCategoryInput = {
  data?: Maybe<JobCategoryInput>;
};

export type CreateJobCategoryPayload = {
  __typename?: 'createJobCategoryPayload';
  jobCategory?: Maybe<JobCategory>;
};

export type CreateJobInput = {
  data?: Maybe<JobInput>;
};

export type CreateJobPayload = {
  __typename?: 'createJobPayload';
  job?: Maybe<Jobs>;
};

export type CreateMetaOptionInput = {
  data?: Maybe<MetaOptionInput>;
};

export type CreateMetaOptionPayload = {
  __typename?: 'createMetaOptionPayload';
  metaOption?: Maybe<MetaOption>;
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

export type CreateProductInput = {
  data?: Maybe<ProductInput>;
};

export type CreateProductOptionInput = {
  data?: Maybe<ProductOptionInput>;
};

export type CreateProductOptionPayload = {
  __typename?: 'createProductOptionPayload';
  productOption?: Maybe<ProductOption>;
};

export type CreateProductPayload = {
  __typename?: 'createProductPayload';
  product?: Maybe<Product>;
};

export type CreateRepresentativeInput = {
  data?: Maybe<RepresentativeInput>;
};

export type CreateRepresentativePayload = {
  __typename?: 'createRepresentativePayload';
  representative?: Maybe<Representative>;
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

export type DeleteAcceptedStudentPayload = {
  __typename?: 'deleteAcceptedStudentPayload';
  acceptedStudent?: Maybe<AcceptedStudent>;
};

export type DeleteAllergyInput = {
  where?: Maybe<InputId>;
};

export type DeleteAllergyPayload = {
  __typename?: 'deleteAllergyPayload';
  allergy?: Maybe<Allergy>;
};

export type DeleteAssumedStudentPayload = {
  __typename?: 'deleteAssumedStudentPayload';
  assumedStudent?: Maybe<AssumedStudent>;
};

export type DeleteCategoryInput = {
  where?: Maybe<InputId>;
};

export type DeleteCategoryPayload = {
  __typename?: 'deleteCategoryPayload';
  category?: Maybe<Category>;
};

export type DeleteChapterPayload = {
  __typename?: 'deleteChapterPayload';
  chapter?: Maybe<Chapter>;
};

export type DeleteChapterYearInput = {
  where?: Maybe<InputId>;
};

export type DeleteChapterYearPayload = {
  __typename?: 'deleteChapterYearPayload';
  chapterYear?: Maybe<ChapterYear>;
};

export type DeleteCommitteeFunctionInput = {
  where?: Maybe<InputId>;
};

export type DeleteCommitteeFunctionPayload = {
  __typename?: 'deleteCommitteeFunctionPayload';
  committeeFunction?: Maybe<CommitteeFunction>;
};

export type DeleteCommitteeInput = {
  where?: Maybe<InputId>;
};

export type DeleteCommitteeLandingpagePayload = {
  __typename?: 'deleteCommitteeLandingpagePayload';
  committeeLandingpage?: Maybe<CommitteeLandingpage>;
};

export type DeleteCommitteeObjectiveInput = {
  where?: Maybe<InputId>;
};

export type DeleteCommitteeObjectivePayload = {
  __typename?: 'deleteCommitteeObjectivePayload';
  committeeObjective?: Maybe<CommitteeObjective>;
};

export type DeleteCommitteePayload = {
  __typename?: 'deleteCommitteePayload';
  committee?: Maybe<Committee>;
};

export type DeleteCompanyInput = {
  where?: Maybe<InputId>;
};

export type DeleteCompanyPayload = {
  __typename?: 'deleteCompanyPayload';
  company?: Maybe<Company>;
};

export type DeleteDietInput = {
  where?: Maybe<InputId>;
};

export type DeleteDietPayload = {
  __typename?: 'deleteDietPayload';
  diet?: Maybe<Diet>;
};

export type DeleteDocumentCategoryInput = {
  where?: Maybe<InputId>;
};

export type DeleteDocumentCategoryPayload = {
  __typename?: 'deleteDocumentCategoryPayload';
  documentCategory?: Maybe<DocumentCategory>;
};

export type DeleteDocumentPayload = {
  __typename?: 'deleteDocumentPayload';
  document?: Maybe<Document>;
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

export type DeleteFeedbackInput = {
  where?: Maybe<InputId>;
};

export type DeleteFeedbackPayload = {
  __typename?: 'deleteFeedbackPayload';
  feedback?: Maybe<Feedback>;
};

export type DeleteFileInput = {
  where?: Maybe<InputId>;
};

export type DeleteFilePayload = {
  __typename?: 'deleteFilePayload';
  file?: Maybe<UploadFile>;
};

export type DeleteFooterPayload = {
  __typename?: 'deleteFooterPayload';
  footer?: Maybe<Footer>;
};

export type DeleteHeaderPayload = {
  __typename?: 'deleteHeaderPayload';
  header?: Maybe<Header>;
};

export type DeleteJobCategoryInput = {
  where?: Maybe<InputId>;
};

export type DeleteJobCategoryPayload = {
  __typename?: 'deleteJobCategoryPayload';
  jobCategory?: Maybe<JobCategory>;
};

export type DeleteJobInput = {
  where?: Maybe<InputId>;
};

export type DeleteJobPayload = {
  __typename?: 'deleteJobPayload';
  job?: Maybe<Jobs>;
};

export type DeleteMetaOptionInput = {
  where?: Maybe<InputId>;
};

export type DeleteMetaOptionPayload = {
  __typename?: 'deleteMetaOptionPayload';
  metaOption?: Maybe<MetaOption>;
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

export type DeleteProductInput = {
  where?: Maybe<InputId>;
};

export type DeleteProductOptionInput = {
  where?: Maybe<InputId>;
};

export type DeleteProductOptionPayload = {
  __typename?: 'deleteProductOptionPayload';
  productOption?: Maybe<ProductOption>;
};

export type DeleteProductPayload = {
  __typename?: 'deleteProductPayload';
  product?: Maybe<Product>;
};

export type DeleteRepresentativeInput = {
  where?: Maybe<InputId>;
};

export type DeleteRepresentativePayload = {
  __typename?: 'deleteRepresentativePayload';
  representative?: Maybe<Representative>;
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

export type EditAcceptedStudentInput = {
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Maybe<Scalars['ID']>>>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
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

export type EditAssumedStudentInput = {
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  images?: Maybe<Array<Maybe<Scalars['ID']>>>;
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

export type EditChapterInput = {
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  board?: Maybe<Scalars['ID']>;
  images?: Maybe<Array<Maybe<Scalars['ID']>>>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditChapterYearInput = {
  label?: Maybe<Scalars['String']>;
  user?: Maybe<Scalars['ID']>;
  representative?: Maybe<Scalars['ID']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditCommitteeFunctionInput = {
  representatives?: Maybe<Array<Maybe<Scalars['ID']>>>;
  role?: Maybe<Scalars['String']>;
  abbreviation?: Maybe<Scalars['String']>;
  committee_objectives?: Maybe<Array<Maybe<Scalars['ID']>>>;
  featured_role?: Maybe<Scalars['Boolean']>;
  contact?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  role_description?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditCommitteeInput = {
  name?: Maybe<Scalars['String']>;
  events?: Maybe<Array<Maybe<Scalars['ID']>>>;
  posts?: Maybe<Array<Maybe<Scalars['ID']>>>;
  committee_objective?: Maybe<Scalars['ID']>;
  representatives?: Maybe<Array<Maybe<Scalars['ID']>>>;
  abbreviation?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['ID']>;
  contacts?: Maybe<Array<Maybe<Scalars['ID']>>>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditCommitteeLandingpageInput = {
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditCommitteeObjectiveInput = {
  committees?: Maybe<Array<Maybe<Scalars['ID']>>>;
  representatives?: Maybe<Array<Maybe<Scalars['ID']>>>;
  objective?: Maybe<Scalars['String']>;
  committee_roles?: Maybe<Array<Maybe<Scalars['ID']>>>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditCompanyInput = {
  name?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['ID']>;
  jobs?: Maybe<Array<Maybe<Scalars['ID']>>>;
  website?: Maybe<Scalars['String']>;
  backgroundColor?: Maybe<Enum_Company_Backgroundcolor>;
  sponsor?: Maybe<Scalars['Boolean']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditComponentDocumentDocumentInput = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['Date']>;
  category?: Maybe<Scalars['ID']>;
  file?: Maybe<Scalars['ID']>;
  archived?: Maybe<Scalars['Boolean']>;
  current?: Maybe<Scalars['Boolean']>;
  businessYear?: Maybe<Scalars['String']>;
};

export type EditComponentEventFormInputInput = {
  id?: Maybe<Scalars['ID']>;
  label?: Maybe<Scalars['String']>;
  required?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  placeholder?: Maybe<Scalars['String']>;
  regex?: Maybe<Scalars['String']>;
};

export type EditComponentEventFormOptionInput = {
  id?: Maybe<Scalars['ID']>;
  label?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type EditComponentEventFormSelectInput = {
  id?: Maybe<Scalars['ID']>;
  label?: Maybe<Scalars['String']>;
  required?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  meta_option?: Maybe<Scalars['ID']>;
};

export type EditComponentEventFormSwitchInput = {
  id?: Maybe<Scalars['ID']>;
  label?: Maybe<Scalars['String']>;
  required?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
};

export type EditComponentEventInternalDeadlineInput = {
  id?: Maybe<Scalars['ID']>;
  datetime?: Maybe<Scalars['DateTime']>;
};

export type EditComponentEventInternalDietPreferenceInput = {
  id?: Maybe<Scalars['ID']>;
  diets?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type EditComponentEventInternalEndTimeInput = {
  id?: Maybe<Scalars['ID']>;
  datetime?: Maybe<Scalars['DateTime']>;
};

export type EditComponentEventInternalExtraOptionInput = {
  id?: Maybe<Scalars['ID']>;
};

export type EditComponentEventInternalOptionInput = {
  id?: Maybe<Scalars['ID']>;
  label?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type EditComponentEventInternalOrderOptionInput = {
  id?: Maybe<Scalars['ID']>;
  data?: Maybe<Scalars['JSON']>;
};

export type EditComponentEventInternalScheduleInput = {
  id?: Maybe<Scalars['ID']>;
};

export type EditComponentEventInternalStartTimeInput = {
  id?: Maybe<Scalars['ID']>;
  datetime?: Maybe<Scalars['DateTime']>;
};

export type EditComponentEventInternalStreetInput = {
  id?: Maybe<Scalars['ID']>;
  streetName?: Maybe<Scalars['String']>;
  streetPostalCode?: Maybe<Scalars['Int']>;
};

export type EditComponentEventInternalTicketInput = {
  id?: Maybe<Scalars['ID']>;
  swedishName?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  ticketUID?: Maybe<Scalars['String']>;
  englishName?: Maybe<Scalars['String']>;
};

export type EditComponentEventPasswordProtectInput = {
  id?: Maybe<Scalars['ID']>;
  password?: Maybe<Scalars['String']>;
};

export type EditComponentEventPlaceInput = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type EditComponentEventRecipientInput = {
  id?: Maybe<Scalars['ID']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  allergens?: Maybe<Array<Maybe<Scalars['ID']>>>;
  diets?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type EditComponentEventScheduleInput = {
  id?: Maybe<Scalars['ID']>;
  start?: Maybe<Scalars['DateTime']>;
  end?: Maybe<Scalars['DateTime']>;
  deadline?: Maybe<Scalars['DateTime']>;
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
  uid?: Maybe<Scalars['String']>;
};

export type EditComponentFooterSocialInput = {
  id?: Maybe<Scalars['ID']>;
  type?: Maybe<Enum_Componentfootersocial_Type>;
  href?: Maybe<Scalars['String']>;
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

export type EditComponentHeaderContactInput = {
  id?: Maybe<Scalars['ID']>;
  label?: Maybe<Scalars['String']>;
  href?: Maybe<Scalars['String']>;
};

export type EditComponentHeaderFeedbackboxInput = {
  id?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
};

export type EditComponentHeaderLanguageInput = {
  id?: Maybe<Scalars['ID']>;
  label?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
};

export type EditComponentHeaderLogoInput = {
  id?: Maybe<Scalars['ID']>;
  alternative?: Maybe<Scalars['String']>;
  src?: Maybe<Scalars['ID']>;
};

export type EditComponentHeaderMenuSectionInput = {
  id?: Maybe<Scalars['ID']>;
  label?: Maybe<Scalars['String']>;
  href?: Maybe<Scalars['String']>;
  subSection?: Maybe<Array<Maybe<EditComponentHeaderSubSectionInput>>>;
  displayDropDown?: Maybe<Scalars['Boolean']>;
};

export type EditComponentHeaderSubSectionInput = {
  id?: Maybe<Scalars['ID']>;
  label?: Maybe<Scalars['String']>;
  href?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  icon?: Maybe<Enum_Componentheadersubsection_Icon>;
  color?: Maybe<Enum_Componentheadersubsection_Color>;
};

export type EditComponentJobAboutInput = {
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type EditComponentJobContactInput = {
  id?: Maybe<Scalars['ID']>;
  label?: Maybe<Scalars['String']>;
  type?: Maybe<Enum_Componentjobcontact_Type>;
  href?: Maybe<Scalars['String']>;
};

export type EditComponentJobDescriptionInput = {
  id?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
};

export type EditComponentJobImageInput = {
  id?: Maybe<Scalars['ID']>;
  image?: Maybe<Scalars['ID']>;
};

export type EditComponentJobMailInput = {
  id?: Maybe<Scalars['ID']>;
  email?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
};

export type EditComponentJobRequirementInput = {
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  requirements?: Maybe<Array<Maybe<EditComponentJobTaskItemInput>>>;
};

export type EditComponentJobTaskInput = {
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  taskItem?: Maybe<Array<Maybe<EditComponentJobTaskItemInput>>>;
  description?: Maybe<Scalars['String']>;
};

export type EditComponentJobTaskItemInput = {
  id?: Maybe<Scalars['ID']>;
};

export type EditComponentJobYearInput = {
  id?: Maybe<Scalars['ID']>;
  year?: Maybe<Enum_Componentjobyear_Year>;
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

export type EditDocumentCategoryInput = {
  name?: Maybe<Scalars['String']>;
  relatedCategories?: Maybe<Array<Maybe<Scalars['ID']>>>;
  relatedTo?: Maybe<Scalars['ID']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditDocumentInput = {
  document?: Maybe<Array<Maybe<EditComponentDocumentDocumentInput>>>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditEmailTemplateInput = {
  design?: Maybe<Scalars['JSON']>;
  name?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
  bodyHtml?: Maybe<Scalars['String']>;
  bodyText?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
  tags?: Maybe<Scalars['JSON']>;
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
  body?: Maybe<Scalars['String']>;
  media?: Maybe<Array<Maybe<Scalars['ID']>>>;
  public?: Maybe<Scalars['Boolean']>;
  password?: Maybe<Scalars['String']>;
  products?: Maybe<Array<Maybe<Scalars['ID']>>>;
  schedule?: Maybe<EditComponentEventScheduleInput>;
  location?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditFeedbackInput = {
  emotion?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  publishable?: Maybe<Scalars['Boolean']>;
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

export type EditFooterInput = {
  representative?: Maybe<Scalars['ID']>;
  social?: Maybe<Array<Maybe<EditComponentFooterSocialInput>>>;
  logo?: Maybe<Scalars['ID']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditHeaderInput = {
  sections?: Maybe<Array<Maybe<EditComponentHeaderMenuSectionInput>>>;
  languages?: Maybe<Array<Maybe<EditComponentHeaderLanguageInput>>>;
  contact?: Maybe<EditComponentHeaderContactInput>;
  logo?: Maybe<Scalars['ID']>;
  feedbackbox?: Maybe<EditComponentHeaderFeedbackboxInput>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditJobCategoryInput = {
  name?: Maybe<Scalars['String']>;
  jobs?: Maybe<Array<Maybe<Scalars['ID']>>>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditJobInput = {
  title?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  deadlineDate?: Maybe<Scalars['DateTime']>;
  startDate?: Maybe<Scalars['DateTime']>;
  jobCategory?: Maybe<Scalars['ID']>;
  company?: Maybe<Scalars['ID']>;
  year?: Maybe<Array<Maybe<EditComponentJobYearInput>>>;
  body?: Maybe<Scalars['String']>;
  contact?: Maybe<Array<Maybe<EditComponentJobContactInput>>>;
  position?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  banner?: Maybe<Scalars['ID']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditLocaleInput = {
  name?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditMetaOptionInput = {
  name?: Maybe<Scalars['String']>;
  option?: Maybe<Array<Maybe<EditComponentEventFormOptionInput>>>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditOrderInput = {
  data?: Maybe<Scalars['JSON']>;
  event?: Maybe<Scalars['ID']>;
  products?: Maybe<Array<Maybe<Scalars['ID']>>>;
  reference?: Maybe<Scalars['String']>;
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
  body?: Maybe<Scalars['String']>;
  banner?: Maybe<Scalars['ID']>;
  localizations?: Maybe<Array<Maybe<Scalars['ID']>>>;
  locale?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditProductInput = {
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  stock?: Maybe<Scalars['Int']>;
  count?: Maybe<Scalars['Int']>;
  media?: Maybe<Scalars['ID']>;
  reference?: Maybe<Scalars['String']>;
  product_options?: Maybe<Array<Maybe<Scalars['ID']>>>;
  consumable?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  published_at?: Maybe<Scalars['DateTime']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditProductOptionInput = {
  name?: Maybe<Scalars['String']>;
  data: Array<Scalars['ProductOptionDataDynamicZoneInput']>;
  reference?: Maybe<Scalars['String']>;
  allowMany?: Maybe<Scalars['Boolean']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditRepresentativeInput = {
  user?: Maybe<Scalars['ID']>;
  committee_roles?: Maybe<Array<Maybe<Scalars['ID']>>>;
  committee_objectives?: Maybe<Array<Maybe<Scalars['ID']>>>;
  committees?: Maybe<Array<Maybe<Scalars['ID']>>>;
  cover?: Maybe<Scalars['ID']>;
  hidden?: Maybe<Scalars['Boolean']>;
  chapter_year?: Maybe<Scalars['ID']>;
  personal_description?: Maybe<Scalars['String']>;
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
  nickname?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  chapter_year?: Maybe<Scalars['ID']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type UpdateAcceptedStudentInput = {
  data?: Maybe<EditAcceptedStudentInput>;
};

export type UpdateAcceptedStudentPayload = {
  __typename?: 'updateAcceptedStudentPayload';
  acceptedStudent?: Maybe<AcceptedStudent>;
};

export type UpdateAllergyInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditAllergyInput>;
};

export type UpdateAllergyPayload = {
  __typename?: 'updateAllergyPayload';
  allergy?: Maybe<Allergy>;
};

export type UpdateAssumedStudentInput = {
  data?: Maybe<EditAssumedStudentInput>;
};

export type UpdateAssumedStudentPayload = {
  __typename?: 'updateAssumedStudentPayload';
  assumedStudent?: Maybe<AssumedStudent>;
};

export type UpdateCategoryInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditCategoryInput>;
};

export type UpdateCategoryPayload = {
  __typename?: 'updateCategoryPayload';
  category?: Maybe<Category>;
};

export type UpdateChapterInput = {
  data?: Maybe<EditChapterInput>;
};

export type UpdateChapterPayload = {
  __typename?: 'updateChapterPayload';
  chapter?: Maybe<Chapter>;
};

export type UpdateChapterYearInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditChapterYearInput>;
};

export type UpdateChapterYearPayload = {
  __typename?: 'updateChapterYearPayload';
  chapterYear?: Maybe<ChapterYear>;
};

export type UpdateCommitteeFunctionInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditCommitteeFunctionInput>;
};

export type UpdateCommitteeFunctionPayload = {
  __typename?: 'updateCommitteeFunctionPayload';
  committeeFunction?: Maybe<CommitteeFunction>;
};

export type UpdateCommitteeInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditCommitteeInput>;
};

export type UpdateCommitteeLandingpageInput = {
  data?: Maybe<EditCommitteeLandingpageInput>;
};

export type UpdateCommitteeLandingpagePayload = {
  __typename?: 'updateCommitteeLandingpagePayload';
  committeeLandingpage?: Maybe<CommitteeLandingpage>;
};

export type UpdateCommitteeObjectiveInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditCommitteeObjectiveInput>;
};

export type UpdateCommitteeObjectivePayload = {
  __typename?: 'updateCommitteeObjectivePayload';
  committeeObjective?: Maybe<CommitteeObjective>;
};

export type UpdateCommitteePayload = {
  __typename?: 'updateCommitteePayload';
  committee?: Maybe<Committee>;
};

export type UpdateCompanyInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditCompanyInput>;
};

export type UpdateCompanyPayload = {
  __typename?: 'updateCompanyPayload';
  company?: Maybe<Company>;
};

export type UpdateDietInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditDietInput>;
};

export type UpdateDietPayload = {
  __typename?: 'updateDietPayload';
  diet?: Maybe<Diet>;
};

export type UpdateDocumentCategoryInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditDocumentCategoryInput>;
};

export type UpdateDocumentCategoryPayload = {
  __typename?: 'updateDocumentCategoryPayload';
  documentCategory?: Maybe<DocumentCategory>;
};

export type UpdateDocumentInput = {
  data?: Maybe<EditDocumentInput>;
};

export type UpdateDocumentPayload = {
  __typename?: 'updateDocumentPayload';
  document?: Maybe<Document>;
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

export type UpdateFeedbackInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditFeedbackInput>;
};

export type UpdateFeedbackPayload = {
  __typename?: 'updateFeedbackPayload';
  feedback?: Maybe<Feedback>;
};

export type UpdateFooterInput = {
  data?: Maybe<EditFooterInput>;
};

export type UpdateFooterPayload = {
  __typename?: 'updateFooterPayload';
  footer?: Maybe<Footer>;
};

export type UpdateHeaderInput = {
  data?: Maybe<EditHeaderInput>;
};

export type UpdateHeaderPayload = {
  __typename?: 'updateHeaderPayload';
  header?: Maybe<Header>;
};

export type UpdateJobCategoryInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditJobCategoryInput>;
};

export type UpdateJobCategoryPayload = {
  __typename?: 'updateJobCategoryPayload';
  jobCategory?: Maybe<JobCategory>;
};

export type UpdateJobInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditJobInput>;
};

export type UpdateJobPayload = {
  __typename?: 'updateJobPayload';
  job?: Maybe<Jobs>;
};

export type UpdateMetaOptionInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditMetaOptionInput>;
};

export type UpdateMetaOptionPayload = {
  __typename?: 'updateMetaOptionPayload';
  metaOption?: Maybe<MetaOption>;
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

export type UpdateProductInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditProductInput>;
};

export type UpdateProductOptionInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditProductOptionInput>;
};

export type UpdateProductOptionPayload = {
  __typename?: 'updateProductOptionPayload';
  productOption?: Maybe<ProductOption>;
};

export type UpdateProductPayload = {
  __typename?: 'updateProductPayload';
  product?: Maybe<Product>;
};

export type UpdateRepresentativeInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditRepresentativeInput>;
};

export type UpdateRepresentativePayload = {
  __typename?: 'updateRepresentativePayload';
  representative?: Maybe<Representative>;
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
