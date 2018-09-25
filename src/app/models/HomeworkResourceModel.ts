
// Post Type: 0 -> article, 1 -> resource, 2 -> question
// Server returned resource data
export class BriefPost {
  post_author: string;
  post_title: string;
  post_subTitle: string;
  post_des: string;
  post_grade: string;
  post_subject: string;
  post_tags: string[];
  post_image: string;
  post_type: number;
  user_id: string;
}

// Post object sent to server
export class PostObject {
  post_basicInfo: PostBasicInfo;
  post_detailsInfo: PostDetails;

  constructor(
    post_basicInfo: PostBasicInfo,
    post_detailsInfo: PostDetails
  ) {
    this.post_basicInfo = post_basicInfo;
    this.post_detailsInfo = post_detailsInfo;
  }
}

// Post basic information collected from basic form
export class PostBasicInfo {
  post_title;
  post_subTitle;
  post_subject;
  post_grade;
  post_tags;
  post_privacy;
  post_des;
  post_image;
  constructor({
    post_title,
    post_subTitle,
    post_subject,
    post_grade,
    post_tags,
    post_privacy,
    post_des,
    post_image
  }: {post_title?: string,
    post_subTitle?: string,
    post_subject?: string,
    post_grade?: string,
    post_tags?: string[],
    post_privacy?: number,
    post_des?: string,
    post_image?: string}) {

    this.post_subject = post_subject;
    this.post_grade = post_grade;
    this.post_title = post_title;
    this.post_subTitle = post_subTitle;
    this.post_tags = post_tags;
    this.post_privacy = post_privacy;
    this.post_des = post_des;
    this.post_image = post_image;
  }
}

// Post Details Type: 0 -> files only, 1 -> ck editor, 2 -> question
export class PostDetails {
  post_type: number;
  post_details_type: number;
  post_details: PostDetailsInfo;

  constructor(
    post_type: number,
    post_details_type: number,
    post_details: PostDetailsInfo
  ) {
    this.post_type = post_type;
    this.post_details_type = post_details_type;
    this.post_details = post_details;
  }
}

// Post Details information
export class PostDetailsInfo {

  constructor() {

  }
}

// article data
export class ArticleData {
  article_body: string;

  constructor(article_body: string) {
    this.article_body = article_body;
  }
}


// Basic operational property
export class BasicOpProperty {
  user_type: string;
  mode: string;
  resource_type: string;

  constructor(
    userType: string,
    mode: string,
    resourceType: string
  ) {
    this.user_type = userType;
    this.mode = mode;
    this.resource_type = resourceType;
  }
}

// Extra operational property
export class ExtraOpProperty {
  from: string;
  extra: any;
  constructor(
    from: string,
    extra: any
  ) {
    this.from = from;
    this.extra = extra;
  }
}


export interface HomeworkResourceModel {

}

export class ResourceData {
  studyResource_id: number; //
  resource_author: string;
  author_photo: any;
  resource_type: any;
  resource_title: string; //
  resource_des: string; //
  resource_image: any; //
  resource_tags: any; //
  resource_body: object; ///
  isPublic: number; //
  tutor_id: string;
  created_at: string;
  updated_at: string;

  constructor() {

  }
}

export class ResourceOprationObject {
  operation: string;
  resourceDetails: ResourceDetails;

  constructor(operation: string, resourceDetails: ResourceDetails) {
    this.operation = operation;
    this.resourceDetails = resourceDetails;
  }
}

export class ResourceDetails {
  resource_type: string;
  resource_desc: object;
  resource_body: object;

  constructor(resource_type: string, resource_desc: object, resource_body: object) {
    this.resource_type = resource_type;
    this.resource_desc = resource_desc;
    this.resource_body = resource_body;
  }
}

// object for homework information
export class HomeworkInfo {
  // author_photo: string;
  resource_type: number;
  resource_subject: string;
  resource_grade: string;
  resource_title: string;
  resource_des: string;
  // resource_image: string;
  resource_tags: string;
  resource_body: string;
  isPublic: number; // 0 or 1
  resource_image: string;
  constructor(hwBasicInfo: HomeworkBasicInfo, hwQuestionInfo: QuestionInfo) {
    this.resource_type = 1; // homework type

    this.resource_subject = hwBasicInfo.subject;
    this.resource_grade = hwBasicInfo.grade;
    this.resource_title = hwBasicInfo.title;
    this.resource_des = hwBasicInfo.description;

    this.resource_tags = hwBasicInfo.subject.toString();

    this.isPublic = Number(hwBasicInfo.view);
    this.resource_body = JSON.stringify(hwQuestionInfo);
    this.resource_image = hwBasicInfo.img;
  }
}

export class HomeworkBasicInfo {
  subject: string;
  grade: string;
  title: string;
  category: any[];
  level: string;
  topic: string;
  view: number;
  timeDuration: any;
  description: string;
  img: any;

  constructor(
    hwSubject: string,
    hwGrade: string,
    hwTitle: string,
    hwCategory: any[],
    hwLevel: string,
    hwTopic: string,
    hwView: number,
    hwTimeDuration: number,
    hwDescription: string
  ) {
    this.subject = hwSubject;
    this.grade = hwGrade;
    this.title = hwTitle;
    this.category = hwCategory;
    this.level = hwLevel;
    this.topic = hwTopic;
    this.view = hwView;
    this.timeDuration = hwTimeDuration;
    this.description = hwDescription;
  }
}

// question information
export class QuestionInfo {
  questionType: string;
  questionCollection: QuestionObj[];

  constructor(type: string, list: QuestionObj[]) {
    this.questionType = type;
    this.questionCollection = list;
  }
}

// object for each single question
export class QuestionObj {
  questionObjType: string;
  questionId: number;
  questionContent: any;
  questionSaveStatus: string;

  constructor(type: string, quizId: number, quizContent: any) {
    this.questionObjType = type;
    this.questionId = quizId;
    this.questionContent = quizContent;
  }
}

export class ShortAnswers {
  questionId: number;
  questionType: string;
  questionTitle: string;
  questionText: string;
  questionAnswer: any;
}