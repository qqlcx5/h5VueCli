<template>
  <div id="tv_chart_container" ref="tv_chart_container">
  </div>
</template>

<script>
import Io from '@/utils/socket/index';
/* eslint-disable */
import Tv from './index'

export default {
  data () {
    return {
      lang: '',
      loading: false,
      theme: '',
      tradName: '', // 交易对 ABC/ECS
      ticker: '', //  请求标示ABC_ECS
      symTrad: null,
      interval: '240', // 分辨率，时间
    }
  },
  props: {
    trad: Object,
    forwhat: {
      type: String,
      default: 'kline', // kline、ram、rex
    }
  },
  computed: {
  },
  watch: {
    '$store.state.app.language': function change(val) {
      this.lang = this.handleFormatLang(val);
      this.handleLoadTradingView();
    },
    '$store.state.app.klineConfig.interval': function change(val, oldVal) {
      this.handleTradViewUnsubscribe(oldVal);
      this.interval = val;
    },
  },
  created() {
  },
  mounted() {
    this.lang = this.handleFormatLang(this.$store.state.app.language);
    if (this.forwhat === 'kline') {
      this.handleLoadTradingView();
    }
  },
  beforeDestroy() {
    this.handleTradViewUnsubscribe();
  },
  methods: {
    handleTradViewUnsubscribe(oldVal) {
      let type = 'minute';
      const resolution = oldVal || this.interval.toString();
      if (resolution === '5') {
        type = 'minute5'
      } else if (resolution === '15') {
        type = 'minute15'
      } else if (resolution === '30') {
        type = 'minute30'
      } else if (resolution === '60') {
        type = 'hour'
      } else if (resolution === '240') {
        type = 'hour4'
      } else if (resolution === '1D') {
        type = 'day'
      } else if (resolution === '1W') {
        type = 'week'
      } else if (resolution === '1M') {
        type = 'month'
      }
      const query = this.$route.params;
      if (this.ticker !=='' && this.forwhat === 'kline') {
        Io.cfwsUnsubscribe(`kline.${type}.${this.ticker}`);
        return;
      }
    },
    handleLoadTradingView() {
      this.loading = true;
      let theme_str = 'white';
      if (this.$store.state.app && this.$store.state.app.theme === 'theme-1B1D27') {
        theme_str = 'black';
      }
      let params = {
        interval: this.interval, // 分辨率（时间周期）
        wgconfig: this.handleGetThemeConfig(theme_str),
        self: this,
      };
      if (this.forwhat === 'kline') {
        const trad = this.trad;
        this.tradName = `${trad.symbol1}/${trad.symbol2}`;
        this.ticker = trad.symbol;
        params = Object.assign(params, {
          name: this.tradName, // k线显示的交易对
          ticker: this.ticker, // 后台请求币种对
          pricescale: 10 ** this.trad.priceDecimal, // 保留小数位位数
        });
        Tv.init(params, () => {
          this.loading = false;
          this.handleChartReady();
        });
      }
    },

    handleGetThemeConfig(str) {
      const themeobj = {
        'black': {
          locale: this.lang, // 多语言
          custom_css_url: '/static/chart_library/static/theme/black.css',
          toolbar_bg: '#152247', // 工具栏背景色
          // 加载背景色, 加载条颜色
          loading_screen: { backgroundColor: "#152247", foregroundColor: '#fff' },
          overrides: {
						"paneProperties.background": "#152247", // 背景色
            "paneProperties.vertGridProperties.color": "RGBA(153, 153, 156, 0.1)", //横线
            "paneProperties.horzGridProperties.color": "RGBA(153, 153, 156, 0.1)", //竖线
            "scalesProperties.textColor" : "#AAA", // 字体颜色
          },
        },
        'white': {
          locale: this.lang, // 多语言
          custom_css_url: '/static/chart_library/static/theme/white.css',
          toolbar_bg: '#fff', // 工具栏背景色
          // 加载背景色, 加载条颜色
          loading_screen: { backgroundColor: "#fff", foregroundColor: 'RGBA(0, 148, 213, 1)' },
          overrides: {
						"paneProperties.background": "#ffffff",
            "paneProperties.vertGridProperties.color": "RGBA(153,153,156,.1)",
            "paneProperties.horzGridProperties.color": "RGBA(153,153,156,.1)",
            "scalesProperties.textColor" : "#333",
          },
        }
      };
      const overrides = {
        // "mainSeriesProperties.candleStyle.upColor": "#14A670", // 涨、蜡烛图的颜色
        // "mainSeriesProperties.candleStyle.downColor": "#F83F3F", // 跌、蜡烛图的颜色
        "mainSeriesProperties.candleStyle.drawBorder": true, // 是否显示蜡烛图的边框
        "mainSeriesProperties.candleStyle.borderUpColor": "#40A771", // 蜡烛图的边框颜色
        "mainSeriesProperties.candleStyle.borderDownColor": "#E53A48",
        "mainSeriesProperties.candleStyle.wickUpColor": "#40A771", // 蜡烛图中间线的颜色
        "mainSeriesProperties.candleStyle.wickDownColor": "#E53A48",
        "volumePaneSize": "medium", // 成交量显示大小 支持的值: large, medium, small, tiny
        "timeScale.rightOffset": 2, // 蜡烛图最右边的那条与Y轴的距离
        // "paneProperties.legendProperties.showLegend": false, // 是否显示 交易对和分辨率（时间周期）
        // "paneProperties.legendProperties.showSeriesTitle": true, // // 是否显示 交易对和分辨率（时间周期）
        "paneProperties.legendProperties.showStudyArguments": false, // 是否显示成交量右上角Volume -> (20)
        "paneProperties.legendProperties.showStudyTitles": true, // 是否显示成交量右上角Volume
        "paneProperties.legendProperties.showStudyValues": true, // 是否显示成交量 数字
        "mainSeriesProperties.lineStyle.color": "#6ba583", // 折线图的颜色
      }
      themeobj.white.overrides = Object.assign(themeobj.white.overrides, overrides);
      themeobj.black.overrides = Object.assign(themeobj.black.overrides, overrides);
      return themeobj[str];
    },

    // TradingView 语言调整
    handleFormatLang(val) {
      let lang = val;
      if (lang === 'zh-TW') {
        lang = 'zh_TW';
      }
      if (lang === 'zh-CN') {
        lang = 'zh';
      }
      return lang;
    },

    handleChartReady(){
      const _this = this;
      Tv.widget.onChartReady(() => {
        Tv.createdDataBtn(this.$t('tv.minute'), this.interval === '1', '1');
        Tv.createdDataBtn(this.$t('tv.minute5'), this.interval === '5', '5');
        Tv.createdDataBtn(this.$t('tv.minute15'), this.interval === '15', '15');
        Tv.createdDataBtn(this.$t('tv.minute30'), this.interval === '30', '30');
        Tv.createdDataBtn(this.$t('tv.hour'), this.interval === '60', '60');
        Tv.createdDataBtn(this.$t('tv.hour4'), this.interval === '240', '240');
        Tv.createdDataBtn(this.$t('tv.day'), this.interval === '1D', '1D');
        Tv.createdDataBtn(this.$t('tv.week'), this.interval === '1W', '1W');
        Tv.createdDataBtn(this.$t('tv.mon'), this.interval === '1M', '1M');
        // this.createdToolBtn();
        // Tv.createdKlineBtn();
        // Tv.createdDepthBtn(() => this.handleDepthAction());
        Tv.createdFillWinBtn();
        // Tv.widget.chart().createStudy('volume', false, false);
        //默认展示MA Cross
        // Tv.widget.chart().createStudy("MA Cross", false, false, [10, 20]);
        // Tv.widget.chart().createStudy('macd', false, false);
        // 图表类型
        // Tv.widget.chart().setChartType(3);
        // Tv.widget.chart().onIntervalChanged().subscribe(null, function(resolution, obj) {
        //   obj.timeframe = Tv.getTimeframe(resolution);
        // });
        // 退出全屏K线
        Tv.widget.onShortcut('esc', function(){
          const tvid = document.getElementById('tv_chart_container');
          if (tvid.className === 'tv_chart_container_full') {
            tvid.className = '';
            const buttonEvent = window.fullscreenBtnEvent;
            const button = buttonEvent[0];
            button.innerHTML = '';
            // button.title = _this.$t('nav.fullScreen');
            buttonEvent.append('<svg width="15" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 586.09999 586.09996"><path d="M172.6 367.9l-97.7 97.7L0 390.7v195.4h195.4l-74.9-74.9 97.7-97.7-45.6-45.6zM195.4 0H0v195.4l74.9-74.9 97.7 97.7 45.6-45.6-97.7-97.7L195.4 0zm195.3 0l74.9 74.9-97.7 97.7 45.6 45.6 97.7-97.7 74.9 74.9V0H390.7zm22.8 367.9l-45.6 45.6 97.7 97.7-74.9 74.9h195.4V390.7l-74.9 74.9-97.7-97.7z"></path></svg>');
            return;
          }
        });
      });
    },
  }
}
</script>

<style lang="scss" scoped>
  #tv_chart_container {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .tv_chart_container_full {
      position: fixed !important;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      z-index: 99999;
  }
  .theme-278EDA #tv_chart_container {
    background: #fff;
  }
  // .theme-1B1D27 #tv_chart_container {
  //   background: $-black1;
  // }
</style>

