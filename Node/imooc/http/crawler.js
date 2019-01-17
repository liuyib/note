// 基于node http的一个小爬虫
// 爬取imooc里面个人信息中最近学习的课程信息

var http = require('http');
var cheerio = require('cheerio');
var url = 'http://www.imooc.com/u/6286176/courses';

function filterChapters(html) {
  var $ = cheerio.load(html); // 获取所有的html代码
  var courses = $('.course-one'); // 获取收藏列表里的所有课程

  // 要获取的数据格式如下：
  // [{
  //   courseTitle: '', // 单个课程的标题
  //   points: { // 课程信息
  //     progress: '', // 进度
  //     useTime: '', // 观看时间
  //     chapter: '' // 观看章节
  //   }
  // }]

  var courseDatas = [];

  courses.each(function (item) {
    var _course = $(this); // 获取单个课程
    var _courseTitle = _course.find('.study-hd').find('a').text();
    var _pointsWrapper = _course.find('.study-points');
    var _points = { // 课程的一些信息
      progress: '', // 进度
      useTime: '', // 观看时间
      chapter: '' // 当前观看章节
    };

    _points.progress = _pointsWrapper.find('.i-left').text();
    _points.useTime = _pointsWrapper.find('.i-mid').text();
    _points.chapter = _pointsWrapper.find('.i-right').text();

    var _courseData = {};
    _courseData.courseTitle = _courseTitle;
    _courseData.points = _points;

    courseDatas.push(_courseData);
  });

  return courseDatas;
}

// 返回最近学习的课程信息
function printCourseInfo(courseDatas) {
  courseDatas.forEach(function (item) {
    var _coursePoints = item.points
    console.log(item.courseTitle);
    console.log(_coursePoints.progress + " " + _coursePoints.useTime + " " + _coursePoints.chapter + '\n');
  });
}

http.get(url, function (res) {
  var html = '';

  res.on('data', function (data) {
    html += data;
  })

  res.on('end', function () {
    var courseDatas = filterChapters(html);

    printCourseInfo(courseDatas);
  })
}).on('error', function () {
  console.log('获取失败');
})