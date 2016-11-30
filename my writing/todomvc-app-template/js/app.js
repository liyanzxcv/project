(function (angular) {
	'use strict';

	// Your starting point. Enjoy the ride!
	angular.module('myApp',[]).controller('myCtrl',['$scope','$location','$window',function($scope,$location,$window){
		var storage=$window.localStorage;
		$scope.input="";
		$scope.currentId='current';
		//console.log(typeof storage['data-list']);字符串
		//console.log(JSON.parse(storage['data-list']));
		$scope.data=storage['data-list']? JSON.parse(storage['data-list']):[];

		function saver(){
			storage['data-list'] = JSON.stringify($scope.data);//本地存储的是字符串
		}
		/*$scope.data=[
			{id:getId(),text:'HTML',complated:true},
			{id:getId(),text:'CSS',complated:true},
			{id:getId(),text:'JavaScript',complated:false},
			{id:getId(),text:'jquery',complated:false}
		];*/
        //此方法用来随机生成列表项的id,同时也避免了每个id的重复
		function getId(){
			var id=Math.random()*10;
			if($scope.data){
				for(var i=0;i<$scope.data.length;i++){
					if($scope.data[i].id==id){
						id = getId();
					}
				}
			}
			return id;
		}
		getId();

		//选中单选框，存储到本地，刷新后此单选框仍是选中的
		$scope.checkOne=function(){
			saver();
		};

		//双击进入编辑状态
		$scope.edit=function(item){
			$scope.currentId = item.id;
			//console.log($scope.currentId);
		};
		//编辑完成后进行保存
		$scope.save=function(){
			$scope.currentId='current';
			saver();
		};
		//新增列表项
		$scope.add=function(){
			if($scope.input==''){
				return;
			}
			$scope.data.push({id:getId(),text:$scope.input,
				complated:false});
            saver();
			$scope.input="";
		};
		//单个删除：从数组里删除某个元素
		$scope.remove=function(item){
			var index=$scope.data.indexOf(item);
			$scope.data.splice(index,1);
			saver();
		};
        //是否显示：右下角的Clear completed
		$scope.hasComplated=function(){
			var hasShow=false;
			for(var f in $scope.data){
				if($scope.data[f].complated){
					hasShow=true;
				}
			}
			return hasShow;
		};
        //点击Clear completed，将选中的删除
		$scope.clear=function(){
			var arr=[];
			for(var b in $scope.data){
				if(!$scope.data[b].complated){
					arr.push($scope.data[b]);
				}
			}
			$scope.data=arr;
			saver();
			return $scope.data;
		}

		//点击最上面的单选框，做到这个与下面所有单选框的同步
		$scope.checkedAll = false;
		$scope.allComplated = function(){
			for(var k in $scope.data){
				$scope.data[k].complated = $scope.checkedAll;
			}
			saver();
		}

		//过滤列表：
		$scope.filterData={};//刚开始时，过滤条件是空对象()，即不过滤

		//console.log($location.url());
		var hash=$location.url();//获取锚点值
		console.log(hash);
		switch (hash) { //根据锚点值得到过滤条件对象
			case '/active':
				$scope.filterData = {complated: false};
				break;
			case '/completed':
				$scope.filterData = {complated: true};
				break;
			default:
				$scope.filterData = {};
				break;
		};

		$scope.hashChange = function(newFilter){
			$scope.filterData = newFilter;
		};


	}])



})(angular);
