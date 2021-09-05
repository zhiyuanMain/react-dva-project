// https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html

import { ResItem } from "src/services/gateway/banner";
import { ResNews } from 'src/services/gateway/news'
import { ResArticle } from 'src/services/gateway/article'

type BannerList = ResItem[]
type NewsList = ResNews
type ArticleView = ResArticle

export as namespace api