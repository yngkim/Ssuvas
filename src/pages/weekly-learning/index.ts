import "../../config/config.axios";
import { GET_attendance_items } from "../../apis/attendance_items";
import { GET_modules } from "../../apis/modules";
import { WeeklyLearningItems } from "./types";

const courseId = location.pathname.split("/")[2];

if (location.pathname.split("/").pop() === "71") {
  setTimeout(async () => {
    try {
      const attendanceData = await GET_attendance_items(courseId);
      const modulesData = await GET_modules(courseId);

      const weeklyLearningItems: WeeklyLearningItems = [];
      modulesData.forEach((module) => {
        module["module_items"].forEach((module_item) => {
          weeklyLearningItems.push({
            title: module_item.title,
            url: `/${location.pathname
              .split("/")
              .slice(1, 3)
              .join("/")}/modules/items/${module_item.module_item_id}`,
            content_id: module_item.content_id ?? -1,
            content_type: module_item.content_type,
            module_item_id: module_item.module_item_id,
            attendance_status:
              module_item.content_type == "attendance_item" &&
              module_item.content_id > 0
                ? attendanceData.attendance_summaries[module_item.content_id]
                    .attendance_status
                : "해당없음",
            attendance_url:
              module_item?.content_data.item_content_data?.content_id ?? "",
            use_attendance: module_item.content_data.use_attendance,
            due_at: module_item.content_data.due_at,
            late_at: module_item.content_data.late_at,
            view_url:
              module_item?.content_data?.item_content_data?.view_url ?? "",
          });
        });
      });

      const weeklyLearningItemElems = [];
      const flags = [false, false, false];
      const titles = ["동영상", "과제", "학습자료"];

      // 출석체크 대상 && 동영상
      weeklyLearningItemElems.push(
        weeklyLearningItems.map((item) => {
          let stringDOM = "";
          if (item.use_attendance) {
            flags[0] = true;
            if (item.attendance_status === "none") {
              stringDOM += `<div onclick=location.href='${item.url}'>
            <h4>${item.title}</h4>
            <h5>${new Date(item.due_at).toLocaleString(
              "ko-KR"
            )}까지 출석이 인정됩니다.</h5>
            <h5>${new Date(item.late_at).toLocaleString(
              "ko-KR"
            )}까지 지각이 인정됩니다.</h5>`;

              if (item.view_url) {
                stringDOM += `<iframe src='${item.view_url}'></iframe>`;
              }
              stringDOM += "</div>";
            } else {
              stringDOM += `<div onclick=location.href='${item.url}'><h4>${item.title}</h4>`;

              if (item.view_url) {
                stringDOM += `<iframe src='${item.view_url}'></iframe>`;
              }
              stringDOM += "</div>";
            }
            return stringDOM;
          } else {
            return "";
          }
        })
      );

      // 과제
      weeklyLearningItemElems.push(
        weeklyLearningItems.map((item) => {
          if (item.content_type === "assignment" && item.due_at !== null) {
            flags[1] = true;
            return `<div onclick=location.href='${item.url}'>${item.title}
          <div>${new Date(item.due_at).toLocaleString(
            "ko-KR"
          )}까지 마감입니다.</div>
          </div>`;
          } else {
            return "";
          }
        })
      );

      // 학습자료
      weeklyLearningItemElems.push(
        weeklyLearningItems.map((item) => {
          if (
            (item.content_type === "attendance_item" && !item.use_attendance) ||
            (item.content_type === "assignment" && item.due_at === null)
          ) {
            flags[2] = true;
            let stringDOM = "";
            stringDOM += `<div onclick=location.href='${item.url}'>${item.title}`;
            // stringDOM += `<div >${item.title}`;
            if (item.view_url) {
              stringDOM += `<div><a id='file-link' href='${item.view_url}' target='_blank' download onclick='event.stopPropagation()'>파일 보기</a></div>`;
            }
            stringDOM += "</div>";

            return stringDOM;
          } else {
            return "";
          }
        })
      );

      for (let i = 0; i < 3; i++) {
        document.querySelector("#content").innerHTML +=
          "<div id=weekly-learning-items></div>";
        document.querySelector("#content").childNodes[
          i
        ].innerHTML += `<h1>${titles[i]}</h1>`;

        if (flags[i]) {
          weeklyLearningItemElems[i].forEach((elem) => {
            document.querySelector("#content").childNodes[i].innerHTML += elem;
          });
        } else {
          document.querySelector("#content").childNodes[i].innerHTML +=
            "해당 사항이 없습니다.";
        }
      }
    } catch (error) {
      document.querySelector("#content").innerHTML += error;
    }
  }, 0);
}
