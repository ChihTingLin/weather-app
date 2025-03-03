"use client";
import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";

function ECharts({
  options = {},
  style = {},
  loading = false,
  message = "",
}) {
  const [chart, setChart] = useState<null | echarts.ECharts>(null);
  const [resizeObserver, setResizeObserver] = useState<any>(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current, "westeros");
    chart.setOption(
      resizeObserver ? { ...options, resizeObserver } : options,
      true
    );
    chart.setOption(options);
    setChart(chart);
    if (resizeObserver) resizeObserver.observe(chartRef.current);
  }, [options, resizeObserver]);

  useEffect(() => {
    if (!chart) {
      return;
    }
    if (loading) {
      chart.showLoading();
      return;
    }

    chart.hideLoading();
  }, [chart, loading]);

  useEffect(() => {
    if (chart && options && message) {
      chart.clear();
    }
  }, [message]);

  useEffect(() => {
    if (window && !resizeObserver) {
      const observer = new window.ResizeObserver((entries) => {
        entries.map((e: any) => {
          const instance = echarts.getInstanceByDom(e.target);
          if (instance) {
            instance.resize();
          }
        });
      });
      setResizeObserver(observer);
    }
  }, []);
  
  const newStyle = {
    height: 350,
    ...style,
  };

  return (
    <div className="echarts-parent position-relative">
      <div ref={chartRef} style={newStyle} className="echarts-react" />
      {message ? <div className="no-data">{message}</div> : null}
    </div>
  );
}

export default React.memo(ECharts);
